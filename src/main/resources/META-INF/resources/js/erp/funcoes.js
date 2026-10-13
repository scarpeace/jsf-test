/// terminei
var init,
    ajaxStatus,
    setFloater,
    triggerToggleAvancado,
    setDatepicker,
    setMascaras,
    mascaraMoeda,
    mascaraNumeroDecimal,
    mascaraNumeroInteiro,
    setPaginatorScroll,
    callIncluir,
    closeIncluir,
    validaBrowser,
    lockForms,
    forceInputUppercase,
    checkStickySidebar;
jQuery(function ($) {
    validaBrowser = function () {
        var versaoIncompativel = false;
        if ($.browser.msie) {
            if (parseInt($.browser.version) == 8) {
                versaoIncompativel = true;
            } else if (parseInt($.browser.version) == 7) {
                versaoIncompativel = true;
            } else if (parseInt($.browser.version) == 6) {
                versaoIncompativel = true;
            }
            if (versaoIncompativel) {
                if (window.location.href.toLowerCase().indexOf("browser") < 0) {
                    window.location =
                        window.location.origin +
                        "/" +
                        window.location.pathname.split("/")[1] +
                        "/public/page/error/browser.jsf";
                }
            }
        }
    };
    //
    lockForms = function () {
        $("form").keypress(function (event) {
            if (event.which == 13 && !$(this).hasClass("permite-enter")) {
                if (
                    $(this).find(":focus").first().prop("tagName") != "TEXTAREA"
                ) {
                    event.preventDefault();
                }
            }
        });
    };
    //
    triggerToggleAvancado = function () {
        var $myPanel;
        $myPanel = $('[id$="painelPesquisaAvancada"]');
        if ($myPanel.is(":hidden")) {
            $myPanel.slideDown("fast", function () {
                $(window).trigger("scroll");
            });
        } else {
            $myPanel.slideUp("fast", function () {
                $(window).trigger("scroll");
            });
        }
        return false;
    };
    //
    setFloater = function () {
        var setOff, fixedTable, $el, $floatingPanel, offsetFloating;
        $el = $(".persist-area").last();
        $floatingPanel = $(".floating-panel").last();
        offsetFloating = null;
        floater = function () {
            // console.log('floater');
            var scrollTop, $tableHeader;
            //
            scrollTop = $(window).scrollTop();

            if (
                !setOff &&
                ($el.length > 0 || $floatingPanel.length > 0) &&
                scrollTop > 0
            ) {
                setOff = true;
                offset = $el.offset();
                if ($floatingPanel.length > 0) {
                    offsetFloating = $floatingPanel.offset();
                }
            }

            // console.log("setOff", setOff);
            if (setOff) {
                if (scrollTop >= offset.top) {
                    if (!$el.hasClass("floating")) {
                        $("body")
                            .css({
                                "padding-top": $el.outerHeight(),
                                "margin-top": $el.outerHeight() * -1
                            });
                        // $el.addClass("floating");
                    }
                } else {
                    if ($el.hasClass("floating")) {
                        $("body").css("padding-top", 0).css("margin-top", 0);
                        $el.removeClass("floating");
                    }
                }
                if ($(".ui-datatable-sticky.ui-sticky").length > 0) {
                    $(".ui-datatable-sticky.ui-sticky").css(
                        "margin-top",
                        $el.outerHeight()
                    );
                }
            }
            //
            if (offsetFloating !== null) {
                fTop = offsetFloating.top - scrollTop;
                if (fTop < 0) {
                    fTop = 0;
                }
                $floatingPanel.css("top", fTop);
            }
        };
        $(window).scroll(floater).trigger("scroll");
    };
    //
    // Mascaras numeros
    mascaraMoeda = function () {
        $(".mascara-moeda").autoNumeric("init", {
            aSep: ".",
            aDec: ",",
        });
    };
    mascaraNumeroDecimal = function () {
        $(".mascara-decimal").keyup(function () {
            this.value = this.value.replace(/[^0-9,\.]/g, "");
        });
    };
    mascaraNumeroInteiro = function () {
        $(".mascara-inteiro").keyup(function () {
            this.value = this.value.replace(/[^\d+$]/g, "");
        });
    };
    setMascaras = function () {
        mascaraMoeda();
        mascaraNumeroDecimal();
        mascaraNumeroInteiro();
    };
    //
    callIncluir = function () {
        $(".sd-floater").show(
            "slide",
            {
                direction: "right",
            },
            500,
            function () {
                $(".sd-back").hide();
            }
        );
    };
    closeIncluir = function () {
        $(".sd-back").show();
        $(".sd-floater").hide(
            "slide",
            {
                direction: "right",
            },
            500,
            function () {}
        );
    };
    // scrollTop on paginator click
    setPaginatorScroll = function () {
        $(".ui-paginator")
            .find(".ui-state-default")
            .click(function () {
                $("html").animate(
                    {
                        scrollTop: 0,
                    },
                    "500",
                    function () {}
                );
            });
    };
    //
    setDatepicker = function () {
        if ($.datepicker) {
            $.datepicker.regional["pt-BR"] = {
                closeText: "Fechar",
                prevText: "&#x3c;Anterior",
                nextText: "Pr&oacute;ximo&#x3e;",
                currentText: "Hoje",
                monthNames: [
                    "Janeiro",
                    "Fevereiro",
                    "Mar&ccedil;o",
                    "Abril",
                    "Maio",
                    "Junho",
                    "Julho",
                    "Agosto",
                    "Setembro",
                    "Outubro",
                    "Novembro",
                    "Dezembro",
                ],
                monthNamesShort: [
                    "Jan",
                    "Fev",
                    "Mar",
                    "Abr",
                    "Mai",
                    "Jun",
                    "Jul",
                    "Ago",
                    "Set",
                    "Out",
                    "Nov",
                    "Dez",
                ],
                dayNames: [
                    "Domingo",
                    "Segunda-feira",
                    "Ter&ccedil;a-feira",
                    "Quarta-feira",
                    "Quinta-feira",
                    "Sexta-feira",
                    "S&aacute;bado",
                ],
                dayNamesShort: [
                    "Dom",
                    "Seg",
                    "Ter",
                    "Qua",
                    "Qui",
                    "Sex",
                    "S&aacute;b",
                ],
                dayNamesMin: [
                    "Dom",
                    "Seg",
                    "Ter",
                    "Qua",
                    "Qui",
                    "Sex",
                    "S&aacute;b",
                ],
                weekHeader: "Sm",
                dateFormat: "dd/MM/yyyy hh:mm:ss",
                firstDay: 0,
                isRTL: false,
                showMonthAfterYear: false,
                yearSuffix: "",
            };
            $.datepicker.setDefaults($.datepicker.regional["pt-BR"]);
        }
        if ($.timepicker) {
            $.timepicker.regional["pt-BR"] = {
                currentText: "Agora",
                closeText: "OK",
                ampm: false,
                timeFormat: "hh:mm:ss",
                timeOnlyTitle: "Definição do Horário",
                timeText: "Horário",
                hourText: "Hora",
                minuteText: "Minuto",
                secondText: "Segundo",
                showSecond: false,
            };
            $.timepicker.setDefaults($.timepicker.regional["pt-BR"]);
        }
    };
    forceInputUppercase = function (e) {
        var start = e.selectionStart;
        var end = e.selectionEnd;
        e.value = e.value.toUpperCase();
        e.setSelectionRange(start, end);
    };
    //
    mobile = {
        $menu: $(".menu-bar .ui-menu").first(),
        $btClose: $("#bt-close-menu-mobile"),
        $btOpen: $("#bt-call-menu-mobile"),
        $overlay: $("#menu-mobile-overlay"),
        $systemHeader: $("#system-header"),
        showFiltro: function () {
            $(".painel-pesquisa").slideDown();
            $(".bt-hide-filtro").slideDown();
            $(".bt-show-filtro").slideUp();
            return false;
        },
        hideFiltro: function () {
            $(".painel-pesquisa").slideUp();
            $(".bt-hide-filtro").slideUp();
            $(".bt-show-filtro").slideDown();
            return false;
        },
        showMenu: function () {
            mobile.$systemHeader.fadeIn();
            mobile.$menu.slideDown();
            mobile.$btClose.fadeIn();
            mobile.$overlay.fadeIn();
            return false;
        },
        hideMenu: function () {
            mobile.$systemHeader.fadeOut();
            mobile.$menu.slideUp();
            mobile.$btClose.fadeOut("fast");
            mobile.$overlay.fadeOut("fast");
            return false;
        },
        setAction: function () {
            var $filterHider;
            $filterHider = $('[id$="mobile-hide-show-filtro"]');
            $filterHider.find(".bt-hide-filtro").click(mobile.hideFiltro);
            $filterHider.find(".bt-show-filtro").click(mobile.showFiltro);
            //
            mobile.$btOpen.click(this.showMenu);
            mobile.$btClose.click(this.hideMenu);
            mobile.$overlay.click(this.hideMenu);
        },
    };
    //
    var sidebar = null;
    checkStickySidebar = function () {
        if (typeof StickySidebar !== "undefined") {
            var mobileWidth = 920;
            var myTopSpacing = 0;
            if ($(window).width() > mobileWidth) {
                if (sidebar === null) {
                    if ($(".secondary-wrapper").length > 0) {
                        if ($(".persist-area").length > 0) {
                            myTopSpacing = $(".persist-area").outerHeight();
                        }
                        sidebar = new StickySidebar(".secondary-wrapper", {
                            containerSelector: ".content-wrapper",
                            innerWrapperSelector: ".secondary",
                            topSpacing: myTopSpacing,
                            bottomSpacing: 20,
                        });
                    }
                } else {
                    sidebar.updateSticky();
                }
            } else {
                if (sidebar != null) {
                    sidebar.destroy();
                    sidebar = null;
                }
            }
        }
    };
    if (typeof StickySidebar !== "undefined") {
        if ($(".secondary-wrapper").length > 0) {
            $(window).resize(checkStickySidebar);
        }
    }
    //
    var setNotificacoesCaller = function () {
        if (typeof carregarNotificacoes === "function") {
            $(".notifications a").click(function (ev) {
                carregarNotificacoes();
                ev.preventDefault();
            });
            $("body").click(function (e) {
                if (
                    !(
                        $(e.target).parents(".notifications").length ||
                        $(e.target).parents(".box_notifications.active").length
                    )
                ) {
                    $(".box_notifications").removeClass("active");
                }
            });
        }
        if (typeof atualizarNaoLidas === "function") {
            $(window).bind("load", function () {
                atualizarNaoLidas();
            });
        }
    };
    //
    init = function () {
        ajaxStatus = {
            $spinner: $("#spinerLoading"),
            $overlay: $("#modalLoading"),
            interval: null,
            intervalProgress: false,
            open: function () {
                ajaxStatus.$spinner.attr("data-ajax-over", "false");
                if (!ajaxStatus.intervalProgress) {
                    ajaxStatus.ajaxSetInterval();
                }
            },
            close: function () {
                ajaxStatus.$spinner.attr("data-ajax-over", "true");
                if (ajaxStatus.$spinner.is(":visible")) {
                    ajaxStatus.$spinner.fadeOut("fast");
                    ajaxStatus.$overlay.fadeOut("fast");
                }
                setMascaras();
                lockForms();
                mobile.setAction();
            },
            checkStatus: function () {
                if (ajaxStatus.$spinner.attr("data-ajax-over") == "false") {
                    ajaxStatus.$spinner.fadeIn("fast");
                    ajaxStatus.$overlay.fadeIn("fast");
                }
                clearInterval(ajaxStatus.interval);
                ajaxStatus.intervalProgress = false;
            },
            ajaxSetInterval: function () {
                ajaxStatus.intervalProgress = true;
                ajaxStatus.interval = setInterval(ajaxStatus.checkStatus, 500);
            },
        };
        //
        validaBrowser();
        setMascaras();
        lockForms();
        setPaginatorScroll();
        setDatepicker();
        setFloater();
        setNotificacoesCaller();
        mobile.setAction();
        //
        $("body").addClass(window.location.host);
    };
    init();
    // para componentes específicos
    // step location input focus
    if ($("#step-location").length > 0) {
        var steps = {
            $location: $("#step-location"),
            highlight: function (index, origin) {
                var jump = false;
                if (origin == "mouseover" && $(":focus").is(":focus")) {
                    var jump = true;
                }
                var current = this.$location.find(".step.focus").index();
                if (current != index && !jump) {
                    this.$location.find(".step.focus").removeClass("focus");
                    this.$location.find(".step").eq(index).addClass("focus");
                }
            },
            init: function () {
                $(".panel-steps").mouseover(function () {
                    steps.highlight($(this).index(), "mouseover");
                });
                $("input, textarea").bind("focus", function () {
                    steps.highlight(
                        $(this).parents(".panel-steps").index(),
                        "focus"
                    );
                });
            },
        };
        steps.init();
    }
});
//
// correção do mouseout do menu nativo do primefaces
PrimeFaces.widget.Menubar.prototype.deactivate = function (b, a) {
    var menu = this;
    menu.activeitem = null;
    b.children("a.ui-menuitem-link").removeClass(
        "ui-state-hover ui-state-active"
    );
    b.removeClass("ui-menuitem-active ui-menuitem-highlight");
    if (a) {
        b.children("ul.ui-menu-child").fadeOut("fast");
    } else {
        b.children("ul.ui-menu-child").hide();
        if (!this.timer) {
            this.timer = setTimeout(function () {
                menu.reset();
            }, 300);
        }
    }
};
PrimeFaces.widget.Menubar.prototype.reactivate = function (d) {
    if (this.timer) {
        clearTimeout(this.timer);
        this.timer = null;
    }
    this.activeitem = d;
    var c = d.children("ul.ui-menu-child"),
        b = c.children("li.ui-menuitem-active:first"),
        a = this;
    if (b.length == 1) {
        a.deactivate(b);
    }
};
PrimeFaces.widget.Menubar.prototype.activate = function (b) {
    if (this.timer) {
        clearTimeout(this.timer);
        this.timer = null;
    }
    this.highlight(b);
    var a = b.children("ul.ui-menu-child");
    if (a.length == 1) {
        this.showSubmenu(b, a);
    }
};
