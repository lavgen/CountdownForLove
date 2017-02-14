$(document).ready ->
    $('#login-button').click () ->
        $.ajax
            url: '/login'
            type: 'POST'
            data: $('#Password').serialize()
            dataType: 'json'
            success: (data, textStatus, jqXHR) ->
                if typeof data.redirect == 'string'
                    window.location = data.redirect