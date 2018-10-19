$(function() {
    $("#notes-list .create-button").on("click", function () {
        $("#notes-list table tbody").append(
            $("<tr></tr>")
                .append($("<td></td>"))
                .append($("<td></td>"))
                .append($("<td></td>"))
                .append($("<td></td>"))
        )
    });
});