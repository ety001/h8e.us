$(function(){
    var submit_func = function(){
        var url = $('#url').val();
        var code = $('#code').val();
        $.AMUI.progress.start();
        $('#create').button('loading');
        $.post(post_url, {url:url, code: code}, function(res){
            $.AMUI.progress.done();
            $('#create').button('reset');
            if(res.status==true) {
                $('#msg').html('<p>'+res.msg+', '+base_url+get_url+'/'+res.data.code+'</p>').removeClass('am-alert-warning').removeClass('am-hide').addClass('am-alert-success');
                $('#url').val('');
                $('#code').val('');
            } else if(res.status==false) {
                $('#msg').html('<p>'+res.msg+'</p>').removeClass('am-alert-success').removeClass('am-hide').addClass('am-alert-warning');
            }
        }, 'json');
    };

    $('#create').bind('click', submit_func);
    $('input').keydown(function(e){
        if(e.which==13) {
            submit_func();
        }
    });
    $('#url').focus();
})