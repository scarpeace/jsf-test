"use strict";
var isTest, ps, globalDefaults, myIp, modules, listMenu, getDomain;
var cookieMan, setClosedCookie, checkCookie;
var listMenu = {},
    matlog = {};
jQuery(document).ready(function ($) {
    var init, opts, $menuErp;
    //
    isTest = false;
    $menuErp = $("#menu-erp");
    //
    globalDefaults = {
        menuUrl: "https://app3.sescpr.com.br/sistemasesc/rest/menu/listar",
    };
    if (isTest) {
        globalDefaults.menuUrl =
            "http://localhost:8080/sistemasesc/rest/menu/listar";
    }
    //
    matlog = {
        val: null,
        _get: function () {
            var cookieVal;
            cookieVal = cookieMan._get(matlog._getKey());
            matlog.val = cookieVal;
        },
        _getKey: function () {
            var key;
            if (
                location.hostname == "localhost" ||
                location.hostname == "127.0.0.1"
            ) {
                key = "matlogdev";
            } else if (location.hostname == "appt.sescpr.com.br") {
                key = "matloghmg";
            } else {
                key = "matlog";
            }
            return key;
        },
    };
    //
    modules = {
        $obj: $("#modules"),
        $objsearch: $(".searchlistmenu"),
        $container: $("#sw-container"),
        defaults: {
            icon: "far fa-circle",
            iconToOpen: "fas fa-chevron-right",
            iconToClose: "fas fa-chevron-left",
        },
        setContainerHeight: function () {
            var windowH = $(window).height();
            var filterH = this.filter.$input.outerHeight();
            var headerH = this.$container.parent().prev().outerHeight();
            var footerH = 0;
            if (this.$container.next().is(":visible")) {
                footerH = this.$container.next().outerHeight();
            }
            //
            this.$container.height(windowH - (filterH + headerH + footerH));
        },
        list: {
            load: function () {
                console.log("list load");
                var param = {
                    cookieValue: matlog.val,
                };
                //
                $.ajax({
                    type: "POST",
                    url: globalDefaults.menuUrl,
                    // data: "{\"cookieValue\":\"4861636b6572206465204320c3a92052.538897CC0488F9A24002EFE5CA6AF8BA7.251AE6D06B085C4236C9F459BBC1736F0.231302e302e342e313534.5733135313032\",\"ip\":\"10.0.4.154\"}",
                    data: JSON.stringify(param),
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (msg, status) {
                        modules.list.prepare(msg.lstMenu);
                        modules.buildMenu();
                        modules.list.saveLocally();
                    },
                    error: function (xhr, msg, e) {
                        console.log("Erro:", msg);
                    },
                });
            },
            prepare: function (list, parentObj = null) {
                console.log("call prepare");
                var id = 0;
                var heritageObj = null;
                if (parentObj != null) {
                    id = parentObj.id;
                }
                var myKey = "submenu-" + id;
                if (list.constructor != Array) {
                    list = new Array(list);
                }
                for (var i = list.length - 1; i >= 0; i--) {
                    list[i].parentKey = myKey;
                    //
                    if (list[i].hasOwnProperty("submenu")) {
                        var parenthood = list[i].name;
                        if (parentObj != null) {
                            parenthood = parentObj.path + " > " + parenthood;
                        }
                        heritageObj = {
                            id: list[i].id,
                            name: list[i].name,
                            path: parenthood,
                            menu: myKey,
                        };
                        parenthood += list[i].name;
                        modules.list.prepare(list[i].submenu, heritageObj);
                        list[i].hasSubmenu = true;
                        delete list[i].submenu;
                    }
                }
                listMenu[myKey] = {
                    items: list,
                    parent: parentObj,
                };
            },
            saveLocally: function () {
                if (localStorage) {
                    var now = new Date();
                    var listLocal = {
                        valid: now.toLocaleDateString(),
                        matlog: matlog.val,
                        list: listMenu,
                    };
                    localStorage.setItem(
                        "listLocal",
                        JSON.stringify(listLocal)
                    );
                }
            },
            reset: function () {
                modules.$obj.html("");
                modules.filter.$list.html("");
                if (localStorage) {
                    localStorage.removeItem("listLocal");
                }
                modules.list.load();
            },
            start: function () {
                var localData = false;
                if (localStorage) {
                    var localList = localStorage.getItem("listLocal");
                    if (localList != null) {
                        localList = JSON.parse(localList);
                        var now = new Date();
                        if (
                            now.toLocaleDateString() == localList.valid &&
                            matlog.val == localList.matlog
                        ) {
                            localData = true;
                            listMenu = localList.list;
                            console.log("fez lista local");
                            modules.buildMenu();
                        }
                    }
                }
                if (!localData) {
                    this.load();
                }
            },
        },
        menuAction: {
            _set: function ($menu) {
                $menu.find("a").click(function () {
                    var $this;
                    $this = $(this);
                    if (!$this.hasClass("disabled")) {
                        if ($this.attr("data-submenu-id")) {
                            modules.menuAction.open($this);
                        } else if ($this.hasClass("voltar")) {
                            modules.menuAction.back($this);
                        } else {
                            modules.menuAction.link($this);
                        }
                        ps.update();
                    }
                    return false;
                });
            },
            open: function ($target) {
                var myId = $target.attr("data-submenu-id");
                var myKey = "submenu-" + myId;
                var myObj = listMenu[myKey];
                var $mySubmenu = $("#" + myKey);
                if ($mySubmenu.length == 0) {
                    var html = modules.mount(myObj);
                    modules.$obj.append(html);
                    var $mySubmenu = $("#" + myKey);
                    // adicionar ações ao menu recem criado
                    modules.menuAction._set($mySubmenu);
                }
                // ocultar todos os menus
                modules.$obj.find("ol").hide();
                // mostrar novo menu
                $mySubmenu.show();
                if ($mySubmenu.parent().is(":hidden")) {
                    $mySubmenu.parent().show();
                }
                modules.state.update();
            },
            back: function ($target) {
                modules.$obj.find("ol").hide();
                if (modules.filter.$input.val().length > 0) {
                    modules.$obj.hide();
                }
                //
                var myOwnSelector = "submenu-" + $target.attr("data-parent-id");
                if (listMenu[myOwnSelector].hasOwnProperty("parent")) {
                    var myParentSelector = listMenu[myOwnSelector].parent.menu;
                    var $myParentMenu = $(myParentSelector);
                    if ($myParentMenu.length > 0) {
                        $myParentMenu.show();
                    } else {
                        modules.$obj.html(
                            modules.mount(listMenu[myParentSelector])
                        );
                        modules.menuAction._set($("#" + myParentSelector));
                    }
                }
                modules.state.update();
            },
            link: function ($target) {
                // console.log('VAI ', $target.attr('href'));
                // return false;
                window.location = $target.attr("href");
            },
        },
        state: {
            _get: function () {
                var state = localStorage.getItem("state");
                if (state != null) {
                    return JSON.parse(state);
                } else {
                    return false;
                }
            },
            apply: function () {
                var stateObj = this._get();
                if (stateObj) {
                    if (stateObj.status == "search") {
                        modules.filter.$input
                            .val(stateObj.ref)
                            .trigger("keyup");
                    } else if (stateObj.status == "nav") {
                        if (
                            stateObj.ref != undefined &&
                            stateObj.ref != "submenu-0"
                        ) {
                            modules.$obj.html(
                                modules.mount(listMenu[stateObj.ref])
                            );
                            modules.menuAction._set($("#" + stateObj.ref));
                        }
                    }
                }
            },
            update: function () {
                var state = {};
                if (modules.filter.$input.val() != "") {
                    state.status = "search";
                    state.ref = modules.filter.$input.val();
                } else {
                    state.status = "nav";
                    state.ref = modules.$obj.find("ol:visible").attr("id");
                }
                localStorage.setItem("state", JSON.stringify(state));
                // console.log('state.update()', state);
            },
        },
        buildMenu: function () {
            var bar;
            // listMenu é global; monta o menu 0;
            this.$obj.html(this.mount(listMenu["submenu-0"]));
            this.setScroll();
            modules.menuAction._set(modules.$obj.find("ol"));
            modules.state.apply();
        },
        // mount: function (data, menuId = null, parentTitle = '', parentId = null) {
        mount: function (data) {
            var html;
            var menuId = 0;
            if (data.hasOwnProperty("parent")) {
                if (data.parent != null) {
                    menuId = data.parent.id;
                }
            }
            html = '<ol class="submenu" id="submenu-' + menuId + '">';
            if (menuId != 0) {
                var parentId = data.parent.id;
                html += "<li>";
                html +=
                    '<a href="#" class="voltar" data-parent-id="' +
                    parentId +
                    '"><i class="icon-submenu ' +
                    this.defaults.iconToClose +
                    '"></i> <span>' +
                    data.parent.name +
                    "</span></a>";
                html += "</li>";
            }
            if (data.hasOwnProperty("items")) {
                for (var i = 0; i <= data.items.length - 1; i++) {
                    html += this.getMenuLine(data.items[i]);
                }
            }
            html += "</ol>";
            return html;
        },
        getMenuLine: function (menuItem, showParent = false) {
            var html = "",
                content = "",
                attributes = "";
            //
            html += '<li class="item-id-' + menuItem.id + '">';
            // set content
            if (menuItem["fa-icon"] != undefined && menuItem["fa-icon"] != "") {
                content += '<i class="' + menuItem["fa-icon"] + '"></i>';
            } else {
                content += '<i class="' + this.defaults.icon + '"></i>';
            }
            content += "<span>";
            if (showParent) {
                if (menuItem.hasOwnProperty("parentKey")) {
                    if (listMenu.hasOwnProperty(menuItem.parentKey)) {
                        if (listMenu[menuItem.parentKey].parent != null) {
                            content +=
                                '<span class="parents">' +
                                listMenu[menuItem.parentKey].parent.path +
                                "</span>";
                        }
                    }
                }
            }
            content += menuItem["name"];
            content += "</span>";
            // set attributes
            if (menuItem.hasSubmenu) {
                attributes += 'data-submenu-id="' + menuItem.id + '" ';
            }
            if (menuItem.desabilitado == "true") {
                attributes += 'class="disabled" ';
            }
            //
            if (menuItem.hasSubmenu) {
                html += '<a href="#" ' + attributes + " >";
                html += content;
                html +=
                    '<i class="icon-submenu ' +
                    this.defaults.iconToOpen +
                    '"></i>';
            } else {
                if (menuItem.url != undefined) {
                    html +=
                        '<a href="' + menuItem.url + '"' + attributes + " >";
                } else {
                    html += '<a href="#"' + attributes + " >";
                }
                html += content;
            }
            html += "</a>";
            html += "</li>";
            return html;
        },
        setScroll: function () {
            this.$obj.find("ol").hide();
            this.$obj.find("ol").first().show();
            this.setContainerHeight();
            ps = new PerfectScrollbar(this.$container[0], {
                wheelSpeed: 2,
                wheelPropagation: false,
                minScrollbarLength: 20,
            });
            ps.update();
        },
        filter: {
            $input: $("#filter-input"),
            $list: $("#filter-list"),
            $clearBt: $(".filter-lateral #close + .fas"),
            foundMenus: null,
            propsToCheck: ["descricaoSistema", "nomeSistema", "sigla", "name"],
            checkVal: function (item, regex) {
                var found = false;
                for (var i = this.propsToCheck.length - 1; i >= 0; i--) {
                    if (item.hasOwnProperty(this.propsToCheck[i])) {
                        if (item[this.propsToCheck[i]].search(regex) != -1) {
                            found = true;
                        }
                    }
                }
                return found;
            },
            live: function () {
                if (this.$list.find("li").length <= 0) {
                    this.buildMenuResults();
                }
                //
                var filterVal = this.$input.val().toUpperCase();
                if (filterVal != "") {
                    modules.$obj.hide();
                    //
                    var regex = new RegExp(filterVal, "i");
                    var foundSelector = "";
                    $.each(listMenu, function (key, val) {
                        for (var i = val.items.length - 1; i >= 0; i--) {
                            if (modules.filter.checkVal(val.items[i], regex)) {
                                if (foundSelector != "") {
                                    foundSelector += ", ";
                                }
                                foundSelector += ".item-id-" + val.items[i].id;
                            }
                        }
                    });
                    this.showResults(foundSelector);
                    //
                    if (!modules.filter.$clearBt.hasClass("fa-times")) {
                        modules.filter.$clearBt
                            .addClass("fa-times")
                            .removeClass("fa-search");
                    }
                } else {
                    this.$list.hide();
                    modules.$obj.show();
                    if (modules.$obj.find("ol:visible").length <= 0) {
                        modules.$obj.find("ol").first().show();
                    }
                    if (modules.filter.$clearBt.hasClass("fa-times")) {
                        modules.filter.$clearBt
                            .removeClass("fa-times")
                            .addClass("fa-search");
                    }
                }
            },
            buildMenuResults: function () {
                var html;
                html = '<ol class="submenu" id="filter-results">';
                for (var j in listMenu) {
                    if (listMenu[j].hasOwnProperty("items")) {
                        for (
                            var i = 0;
                            i <= listMenu[j].items.length - 1;
                            i++
                        ) {
                            html += modules.getMenuLine(
                                listMenu[j].items[i],
                                true
                            );
                        }
                    }
                }
                html += "</ol>";
                this.$list.html(html);
                modules.menuAction._set(this.$list);
            },
            showResults: function (classes) {
                this.$list.find("li").hide();
                this.$list.find(classes).show();
                if (this.$list.is(":hidden")) {
                    this.$list.show();
                }
            },
            clear: function () {
                modules.filter.$input.val("").trigger("keyup");
                modules.state.update();
            },
        },
        toggle: function () {
            var $sw = $(".sw");
            if (!$sw.hasClass("closed")) {
                $sw.addClass("closed");
                setClosedCookie("true");
            } else {
                $sw.removeClass("closed");
                setClosedCookie("false");
            }
        },
        setActions: function () {
            this.filter.$input.on({
                keyup: function () {
                    modules.filter.live();
                },
                focus: function () {
                    modules.filter.live();
                },
                blur: function () {
                    modules.filter.live();
                    modules.state.update();
                },
            });
            if (this.filter.$clearBt.length > 0) {
                this.filter.$clearBt[0].onclick = modules.filter.clear;
            }
            //
            $("#close, #sw-logo-mini").click(function (e) {
                modules.toggle();
                e.preventDefault();
            });
            //
            $(".sw-topbar .branding .logo").click(function () {
                modules.list.reset();
            });
            //
            $(window).resize(function () {
                modules.setContainerHeight();
            });
            //
            this.list.start();
        },
    };
    //
    cookieMan = {
        _set: function (cname, cvalue, exdays) {
            var domain,
                d = new Date();
            domain = cookieMan._getDomain();
            d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
            var expires = "expires=" + d.toUTCString();
            document.cookie =
                cname +
                "=" +
                cvalue +
                ";" +
                expires +
                ";path=/;domain=" +
                domain;
        },
        _get: function (cname) {
            var name = cname + "=";
            var ca = document.cookie.split(";");
            for (var i = 0; i < ca.length; i++) {
                var c = ca[i];
                while (c.charAt(0) == " ") {
                    c = c.substring(1);
                }
                if (c.indexOf(name) == 0) {
                    return c.substring(name.length, c.length);
                }
            }
            return "";
        },
        _getDomain: function () {
            return location.hostname === "localhost" ||
                location.hostname === "127.0.0.1" ||
                location.hostname === "appt.sescpr.com.br"
                ? "localhost"
                : "sescpr.com.br";
        },
    };
    //
    // set cookie
    setClosedCookie = function ($closed) {
        var menuclosed = cookieMan._get("menuclosed");
        if ($closed == "true") {
            cookieMan._set("menuclosed", "true", 365);
        } else {
            cookieMan._set("menuclosed", "false", 365);
        }
    };
    checkCookie = function () {
        var menuclosed = cookieMan._get("menuclosed");
        if (menuclosed == "true") {
            $(".sw").addClass("closed");
            cli = true;
        } else {
            $(".sw").removeClass("closed");
            cli = false;
        }
    };
    // - cookie apenas por jsf - checkCookie();
    init = function () {
        matlog._get();
        if (modules.$obj.length > 0) {
            modules.setActions();
        }
    };
    init();
    //
});
///
