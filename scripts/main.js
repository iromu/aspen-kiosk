var isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;

if (!isMac) {
    var baseUrl = "file:///C:/ASPEN/ubu.com/aspen/";
    var mainUrl = "file:///C:/ASPEN/ubu.com/aspen/index.html";
} else {
    var baseUrl = "file:///Users/Shared/websites/ASPEN/ubu.com/aspen/";
    var mainUrl = "file:///Users/Shared/websites/ASPEN/ubu.com/aspen/index.html";
}

$(document).ready(function () {

    $(document).bind("contextmenu", function (e) {
        return false;
    });

    var dialog;
    var baseTag = document.createElement('base');
    baseTag.href = mainUrl;

    var dialog_open_callback = function (reference) {

        $('#dialog-iframe').on('load', function () {

            return true; // INCOMPATIBLE HTML5 VIDEO CODECS

            var contents = $(this).contents();
            contents.find('embed[src*="mov"]').each(function () {
                var video_src = $(this).attr("src");
                $(this).replaceWith($('<video autoplay controls></video>').attr("src", video_src));
            });
        });
    };

    $('#content').on('load', function () {

        $(this).hide();
        var contents = $(this).contents();

        contents.bind("contextmenu", function (e) {
            e.preventDefault();
            e.stopPropagation();
            return false;
        });

        if (contents.attr('title') === "404 - Not Found") {
            $(this).attr("src", mainUrl);
        }
        else {

            $(this).fadeIn();

            if (baseTag.href !== null)
                contents.find('head').append(baseTag);

            contents.find("table:first").css("display", "none");
            contents.find('a[href*="http"]').css("display", "none");
            contents.find('a[href*="mailto"]').each(function () {
                $(this).replaceWith($(this).text());
            });


            //contents.find("a").css("background-color", "#BADA55");
            contents.find('a').on('click', function (event) {
                var currentAnchor = $(this);
                var href = currentAnchor.attr('href');
                baseTag.href = null;

                if (href.indexOf('#') === 0) {
                    baseTag.href = null;

                } else if (href.indexOf('javascript:newPage') === 0) {
                    //contents.find('head').append(baseTag);

                } else if (href.indexOf('javascript:') === 0) {
                    event.preventDefault();
                    event.stopPropagation();

                    var uri = currentAnchor.context.baseURI.split('/');
                    uri.pop();
                    var location = uri.join('/') + '/' + href.match(/'(.+)'/)[1];

                    dialog = $('<div></div>')
                        .html('<iframe id="dialog-iframe" style="border: 0px; " src="' + location + '" width="99%" height="99%"></iframe>')
                        .dialog({
                            autoOpen: false,
                            modal: true,
                            height: $(document).height() - 20,
                            width: $(document).width() - 20,
                            open: function (event, ui) {
                                dialog_open_callback($(this));
                            },
                            close: function (event, ui) {
                                $(this).remove();
                            }
                        });
                    dialog.dialog('open');

                } else if (href.indexOf('mp3') > 0) {
                    event.preventDefault();
                    event.stopPropagation();

                    var uri = currentAnchor.context.baseURI.split('/');
                    uri.pop();
                    var location = uri.join('/') + '/' + href;

                    dialog = $('<div></div>')
                        .html('<iframe id="dialog-iframe" style="border: 0px; " src="' + location + '" width="99%" height="99%"></iframe>')
                        .dialog({
                            autoOpen: false,
                            modal: true,
                            height: $(document).height() - 20,
                            width: $(document).width() - 20,
                            open: function (event, ui) {
                                dialog_open_callback($(this));
                            },
                            close: function (event, ui) {
                                $(this).remove();
                            }
                        });
                    dialog.dialog('open');

                } else {
                    $(this).hide();
                    // baseTag.href = href;
                    //baseTag.href = baseUrl + href;
                }

            });

        }
    });

    $('#content').attr("src", mainUrl);
});
