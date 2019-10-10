var lock = false;
var unlock = false;
var currentUser = "none";
var currentIcon = "";
var user = "";
var password;
var pronoun = "";

// Global Filename
var currentFilename = "";

$('#restore-backup').on('click', function(e) {
    $("#restoreModal").modal();
    $('#restore-confirm').on('click', function(e) {
        $.ajax({
            type: "GET",
            url: "php/restore.php",
            dataType : "html",
            success: function (response) {
                if (response == 1) {
                    console.log('restored')
                    $('#restore-content').children().remove()
                    $('#restore-content').append('<div class="alert alert-success">Restoration Successful</div>');
                }
                else {
                    $('#restore-content').children().remove();
                    $('#restore-content').append("<div class='alert alert-danger>Restoration Failed</div>");
                }
            }
        });
    });
    $('#restore-cancel').on('click', function(e) {
        $("#restoreModal").modal("toggle");
    });
});

$("#restoreModal").on("hidden.bs.modal", function (e) {
    window.location.reload(true);
});

$("#btn-save-test").on("click", function (e) {
    var programVal = $("input[name=program-hbl]:checked").val();
    console.log("Program: ", programVal);

    var senderVal = $("input[name=real-sender-hbl]:checked").val();
    console.log("Sender: ", senderVal);

    var listVal = $("input[name=normal_list]:checked").val();
    console.log("Sender: ", listVal);

    var listR = ["Stephanie", "Susi", "Jean", "Others"];

    var recipients = $(".recipients:checkbox:checked")
        .map(function () {
            return this.value;
        })
        .get();

    recR = "";

    console.log("Checked!" + recipients);

    if (recipients.includes(listR[0])) {
        recR += "1";
    } else {
        recR += "0";
    }
    if (recipients.includes(listR[1])) {
        recR += "1";
    } else {
        recR += "0";
    }
    if (recipients.includes(listR[2])) {
        recR += "1";
    } else {
        recR += "0";
    }

    var isOthersChecked = $("#rec-4").prop("checked");

    if (isOthersChecked == true) {
        recR += "1";
    } else {
        recR += "0";
    }

    console.log(recR);

    var otherRecipient = $("#other-recipient").val();
    var specialNamed = $("#special-named").val();
    var digitVal = $("#digit-code").val();

    console.log("Names: ", recipients.join(","));

    $.ajax({
        type: "POST",
        url: "save-to-json.php",
        data: {
            doing_real: 0,
            digit_code: digitVal,
            normal_list: listVal,
            program: programVal,
            sender: senderVal,
            recipient: recR,
            other_recipient: otherRecipient,
            special_named: specialNamed
        },
        success: function (response) {
            $("#jsonModal").modal();
            setTimeout(function () {
                $("#jsonModal").modal("hide");
            }, 2000);
        }
    });
});

$("#real-sender-btn").on("click", function (e) {
    $('#abortModal').modal();

    var programVal = $("input[name=program-hbl]:checked").val();
    console.log("Program: ", programVal);

    var senderVal = $("input[name=real-sender-hbl]:checked").val();
    console.log("Sender: ", senderVal);

    var listVal = $("input[name=normal_list]:checked").val();
    console.log("Sender: ", listVal);

    var listR = ["Stephanie", "Susi", "Jean", "Others"];

    var recipients = $(".recipients:checkbox:checked")
        .map(function () {
            return this.value;
    })
    .get();

    recR = "";

    console.log("Checked!" + recipients);

    if (recipients.includes(listR[0])) {
        recR += "1";
    } else {
        recR += "0";
    }
    if (recipients.includes(listR[1])) {
        recR += "1";
    } else {
        recR += "0";
    }
    if (recipients.includes(listR[2])) {
        recR += "1";
    } else {
        recR += "0";
    }

    var isOthersChecked = $("#rec-4").prop("checked");

    if (isOthersChecked == true) {
        recR += "1";
    } else {
        recR += "0";
    }

    console.log(recR);

    var otherRecipient = $("#other-recipient").val();
    var specialNamed = $("#special-named").val();
    var digitVal = $("#digit-code").val();

    console.log("Names: ", recipients.join(","));

    var sendRequest = $.ajax({
        type: "POST",
        url: "interactive-shell.php",
        data: {
            doing_real: 1,
            digit_code: digitVal,
            normal_list: listVal,
            program: programVal,
            sender: senderVal,
            recipient: recR,
            other_recipient: otherRecipient,
            special_named: specialNamed
        },
        success: function (response) {
            $('#abort-send').children().remove()
            $('#abort-send').append('<div class="alert alert-success">Sent Successfully</div>');
            $("#sm-modal-sender").modal("toggle");
            $("#modalForm").css({
                position: "relative !important",
                right: "-800px"
            });
            $("#sm-modal-sender").css({
                position: "relative !important",
                top: "-270px",
                left: "-500px"
            });
            $("#modal-content-out").append(
                '<div class="mt-3 h-100 alert alert-info">' + response + "</div>"
            );
            $.ajax({
                type: "POST",
                url: "report-logger.php",
                data: {content: response},
                success: function(data) {
                    
                }
            })
        }
    });

    $('#abort-confirm').on('click', function(e) {
        sendRequest.abort();
        $('#abort-send').children().remove()
        $('#abort-send').append('<div class="alert alert-success">Aborting Sending Successful</div>');
    });

    $('#abort-cancel').on('click', function(e) {
        $("#abortModal").modal("toggle");
    });

    e.preventDefault();
});

var $modal, $apnData, $modalCon;

$(".modalMinimize").on("click", function () {
    $modalCon = $(this)
        .closest(".sm-sender")
        .attr("id");
    console.log($modalCon);

    $apnData = $(this).closest(".sm-sender");
    console.log($apnData);

    $modal = "#" + $modalCon;
    console.log($modal);

    $(".modal-backdrop").addClass("display-none");

    $($modal).toggleClass("min");

    if ($($modal).hasClass("min")) {
        $(".minmaxCon").append($apnData);

        $(this)
            .find(".fa-minus")
            .toggleClass("fa-minus")
            .toggleClass("fa-clone");
    } else {
        $(".cont").append($apnData);

        $(this)
            .find(".fa-clone")
            .toggleClass("fa-clone")
            .toggleClass("fa-minus");
    }
});

$("#btn-test").on("click", function (e) {
    var programVal = $("input[name=program-hbl]:checked").val();
    console.log("Program: ", programVal);

    var senderVal = $("input[name=real-sender-hbl]:checked").val();
    console.log("Sender: ", senderVal);

    var listVal = $("input[name=normal_list]:checked").val();
    console.log("Sender: ", listVal);

    var listR = ["Stephanie", "Susi", "Jean", "Others"];

    var recipients = $(".recipients:checkbox:checked")
        .map(function () {
            return this.value;
        })
        .get();

    recR = "";

    console.log("Checked!" + recipients);

    if (recipients.includes(listR[0])) {
        recR += "1";
    } else {
        recR += "0";
    }
    if (recipients.includes(listR[1])) {
        recR += "1";
    } else {
        recR += "0";
    }
    if (recipients.includes(listR[2])) {
        recR += "1";
    } else {
        recR += "0";
    }

    var isOthersChecked = $("#rec-4").prop("checked");

    if (isOthersChecked == true) {
        recR += "1";
    } else {
        recR += "0";
    }

    console.log(recR);

    var otherRecipient = $("#other-recipient").val();
    var specialNamed = $("#special-named").val();
    var digitVal = $("#digit-code").val();

    console.log("Names: ", recipients.join(","));

    $.ajax({
        type: "POST",
        url: "interactive-shell.php",
        data: {
            doing_real: 0,
            digit_code: digitVal,
            normal_list: listVal,
            program: programVal,
            sender: senderVal,
            recipient: recR,
            other_recipient: otherRecipient,
            special_named: specialNamed
        },
        success: function (response) {
            $("#sm-modal-sender").modal("toggle");
            $("#modalForm").css({
                position: "relative !important",
                right: "-800px"
            });
            $("#sm-modal-sender").css({
                position: "relative !important",
                top: "-270px",
                left: "-500px"
            });
            $("#modal-content-out").append(
                '<div class="mt-3 h-100 alert alert-info">' + response + "</div>"
            );
            $.ajax({
                type: "POST",
                url: "report-logger.php",
                data: {content: response, mode: 'Test'},
                success: function(data) {
                    
                }
            });
        }
    });

    e.preventDefault();
});

$("#sm-modal-sender").on("show.bs.modal", function () {
    $(this)
        .find(".modal-dialog")
        .css({
            width: "auto", //probably not needed
            height: "auto" //probably not needed
        });
});

$("#sm-modal-sender").on("hidden.bs.modal", function (e) {
    window.location.reload(true);
});

$("#save-as").on("click", function (e) {
    var oldValue = "";
    var filename = prompt("Enter filename: ", oldValue);
    if (filename === "") {
        // user pressed OK, but the input field was empty
    } else if (filename) {
        var contentForm = CKEDITOR.instances["editorForm"].getData();

        $.ajax({
            type: "POST",
            url: "php/save-as.php",
            data: {
                content: contentForm,
                filename: filename
            },
            success: function (response) {
                window.location.reload(true);
            }
        });
    } else {}
});

$("#modalForm").on("show.bs.modal", function () {
    $.getJSON("_OPTS.json", function (data) {
        console.log(data);
        $('input[name=program-hbl][value="' + data.program + '"]').prop(
            "checked",
            true
        );
        $('input[name=real-sender-hbl][value="' + data.isp + '"]').prop(
            "checked",
            true
        );
        
        console.log(data['real_addrs-list']);

        $("#rec-1").attr("data-key", data["testers"].charAt(0));
        $("#rec-2").attr("data-key", data["testers"].charAt(1));
        $("#rec-3").attr("data-key", data["testers"].charAt(2));
        $("#rec-4").attr("data-key", data["testers"].charAt(3));
        console.log(data["testers"].length);
        $('input[name=recipient][data-key="' + 1 + '"]').prop("checked", true);

        if (data["other_tester"] != "") {
            $("#other-recipient").val(data["other_tester"]);
            $('input[name=non_others][value="Others"]').prop("checked", true);
        }

        if (data["real_addrs-list"] != "default") {
            $("#special-named").val(data["real_addrs-list"]);
            $('input[name=normal_list][value="Special list, named"]').prop(
                "checked",
                true
            );
        } else {
            $('input[name=normal_list][value="default"]').prop("checked", true);
        }
        var asterisk = "";
        for (var i = 0; i < 16; i++) {
            asterisk += "*";
        }

        $("#digit-code").val(asterisk);
    });
});

$("#digit-code").on("click", function (e) {
    $("#digit-code").val("");
});

$("#modalForm").on("hidden.bs.modal", function () {
    window.location.reload(true);
});

$("#open-file").on("click", function (e) {
    var oldValue = "";
    var filename = prompt("Enter filename: ", oldValue);
    if (filename === "") {
        // user pressed OK, but the input field was empty
    } else if (filename) {
        $.ajax({
            type: "GET",
            url: "php/open-file.php", 
            data: {
                filename: filename
            },
            success: function (response) {
                alert("Opened file:" + response);
                window.location.href = window.location.href
                window.location.reload(true);
                //location.reload(true);
            }
        });
    } else {}
});

$(document).keydown(function (e) {
    var key = undefined;
    var possible = [e.key, e.keyIdentifier, e.keyCode, e.which];

    while (key === undefined && possible.length > 0) {
        key = possible.pop();
    }

    if (
        key &&
        (key == "111" || key == "79") &&
        (e.ctrlKey || e.metaKey) &&
        !e.altKey
    ) {
        var oldValue = "";
        var filename = prompt("Enter a filename: ", oldValue);
        if (filename === "") {
            // user pressed OK, but the input field was empty
        } else if (filename) {
            $.ajax({
                type: "GET",
                url: "php/open-file.php",
                data: {
                    filename: filename
                },
                success: function (response) {
                    //alert(response)
                    window.location.reload(true);
                }
            });
        } else {}
        return false;
    }

    if (
        key &&
        (key == "115" || key == "83") &&
        (e.ctrlKey || e.metaKey) &&
        !e.altKey
    ) {
        e.preventDefault();
        $("#ckeditorForm").submit();
        return false;
    }
    return true;
});

$(document).ready(function () {
    // Executes All Codes Below after DOM is done loading.

    $("#save-file").on("click", function (e) {
        // Get's current file name
        currentFilename = $("#file-path").text();

        alert(currentFilename.replace("/home/hbladmin/hbposts.com/", ""));
        var contentForm = CKEDITOR.instances["editorForm"].getData();
        $.ajax({
            type: "POST",
            url: "../php/content-saving.php",
            data: {
                content: contentForm
            },
            success: function (data) {
                if (data == 0) {
                    alert("Successfully saved to remote site.");
                } else {
                    alert("Failed to save data.");
                }
            },
            error: function (responseData, textStatus, errorThrown) {
                alert("Failed to save data!");
            }
        });
    });

    function centerModal() {
        $(this).css("display", "block");
        var $dialog = $(this).find(".modal-dialog"),
            offset = ($(window).height() - $dialog.height()) / 2,
            bottomMargin = parseInt($dialog.css("marginBottom"), 10);

        // Make sure you don't hide the top part of the modal w/ a negative margin if it's longer than the screen height, and keep the margin equal to the bottom margin of the modal
        if (offset < bottomMargin) offset = bottomMargin;
        $dialog.css("margin-top", offset);
    }

    $(document).on("show.bs.modal", ".modal", centerModal);
    $(window).on("resize", function () {
        $(".modal:visible").each(centerModal);
    });

    $("#ckeditorForm").on("submit", function (e) {
        var contentForm = CKEDITOR.instances["editorForm"].getData();

        $.ajax({
            type: "POST",
            url: "../php/content-saving.php",
            data: {
                content: contentForm
            },
            success: function (data) {
                if (data == 0) {
                    alert("Successfully saved to remote site.");
                } else {
                    alert("Failed to save data.");
                }
            },
            error: function (responseData, textStatus, errorThrown) {
                alert("Failed to save data!");
            }
        });

        e.preventDefault();
    });

    editor.addCommand("save-content", {
        exec: function (editor) {
            $("#ckeditorForm").submit();
        }
    });

    editor.setKeystroke(CKEDITOR.CTRL + 83, "save-content"); //^s
});