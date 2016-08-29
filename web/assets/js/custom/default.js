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
                var share_url = get_url+res.data.code;
                $('#msg').html('<p>'+res.msg+', '+share_url+'&nbsp;<button id="clip" class="am-btn am-btn-primary am-btn-xs">复制</button></p>').removeClass('am-alert-warning').removeClass('am-hide').addClass('am-alert-success');
                $('#clip').attr('data-clipboard-text', share_url);
                var clip = new Clipboard('#clip');
                clip.on('success', function(e) {
                    $('#clip').html('复制成功');
                });
                clip.on('error', function(e) {
                    $('#clip').html('复制失败');
                });
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