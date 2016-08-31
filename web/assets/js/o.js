(function(){
var h8e_style = "\
    .h8e_modal {\
        z-index: 999;\
        position: fixed;\
        top: 50px;\
        left: 30%;\
        width: 40%;\
        background-color: #ffffff;\
        height: 460px;\
        border: 1px solid #333;\
        padding:30px 50px;\
    }\
    .h8e_modal .h8e_title{\
        margin: 6px 0 !important;\
    }\
    .h8e_modal input{\
        display: block !important;\
        width: 100% !important;\
        padding: .5em !important;\
        font-size: 1.6rem !important;\
        line-height: 1.2 !important;\
        color: #555 !important;\
        vertical-align: middle !important;\
        background-color: #fff !important;\
        background-image: none !important;\
        border: 1px solid #ccc !important;\
        border-radius: 0 !important;\
        -webkit-appearance: none !important;\
        -webkit-transition: border-color .15s ease-in-out,-webkit-box-shadow .15s ease-in-out !important;\
        transition: border-color .15s ease-in-out,-webkit-box-shadow .15s ease-in-out !important ;\
        transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out !important;\
        transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out,-webkit-box-shadow .15s ease-in-out !important;\
    }\
    .h8e_modal h1  {\
        display: block !important;\
        padding: 8px 0 !important;\
        margin: 0 !important;\
        color: #444;\
        text-align: center;\
    }\
    .h8e_modal .h8e_btn {\
        margin-right: 20px !important;\
        display: inline-block !important;\
        margin-bottom: 0 !important;\
        padding: .5em 1em !important;\
        vertical-align: middle !important;\
        font-size: 1.6rem !important;\
        font-weight: 400 !important;\
        line-height: 1.2 !important;\
        text-align: center !important;\
        white-space: nowrap !important;\
        background-image: none !important;\
        border: 1px solid transparent !important;\
        border-radius: 0 !important;\
        cursor: pointer !important;\
        outline: 0 !important;\
        -webkit-appearance: none !important;\
        -webkit-user-select: none !important;\
        -moz-user-select: none !important;\
        -ms-user-select: none !important;\
        user-select: none !important;\
        -webkit-transition: background-color .3s ease-out,border-color .3s ease-out !important;\
        transition: background-color .3s ease-out,border-color .3s ease-out !important;\
    }\
    .h8e_modal .h8e_btn_primary {\
        color: #fff;\
        background-color: #F37B1D;\
        border-color: #F37B1D;\
    }\
    .h8e_modal .h8e_alert {\
        margin-bottom: 1em;\
        padding: .625em;\
        background: #0e90d2;\
        color: #fff;\
        border: 1px solid #0c7cb5;\
        border-radius: 0;\
    }\
    .h8e_modal .h8e_alert_warning {\
        background-color: #F37B1D;\
        border-color: #e56c0c;\
        color: #fff;\
    }\
";
    var cEl = function(ename) {
        return document.createElement(ename);
    }
    var create_modal = function(current_url) {
        var modal = cEl('div');
        modal.className = 'h8e_modal';
        modal.id = 'h8e_modal';
        
        var style_dom = cEl('style');
        style_dom.innerHTML = h8e_style;
        modal.appendChild(style_dom);

        var h8e_title = cEl('h1');
        h8e_title.innerHTML = '<a href="http://h8e.us">胡八一 短网址</a>';
        h8e_title.className = 'h8e_title';
        modal.appendChild(h8e_title);

        var br = cEl('br');

        var url_txt = cEl('div');
        url_txt.innerHTML = '要缩短的网址：';
        modal.appendChild(url_txt);
        
        var url = cEl('input');
        url.type = 'text';
        url.id = 'url';
        url.value = current_url;
        modal.appendChild(url);

        var code_txt = cEl('div');
        code_txt.className = 'h8e_title';
        code_txt.innerHTML = '自定义地址：';
        modal.appendChild(code_txt);

        var code = cEl('input');
        url.type = 'text';
        url.id = 'code';
        modal.appendChild(code);

        modal.appendChild(br);

        var alert_box = cEl('div');
        alert_box.id = 'h8e_alert';
        alert_box.style = 'display:none;';
        modal.appendChild(alert_box);

        var submit = cEl('button');
        submit.id = 'h8e_submit';
        submit.innerHTML = '提交';
        submit.className = 'h8e_btn h8e_btn_primary';
        submit.onclick = function(){
            var code_val = code.value;
            var url_val = url.value;
            submit.innerHTML = 'Waiting...';
            jsonp_send(url_val, code_val);
        }
        modal.appendChild(submit);

        var close = cEl('button');
        close.innerHTML = '关闭';
        close.className = 'h8e_btn';
        close.onclick = function() {
            document.body.removeChild(document.getElementById('h8e_modal'));
            document.head.removeChild(document.getElementById('h8ejs'));
            window.h8ecallback = null;
            delete(window.h8ecallback);
        }
        modal.appendChild(close);

        var adsense_div = cEl('div');
        adsense_div.style = 'margin-top:20px;';

        var adsense_js = cEl('script');
        adsense_js.setAttribute('async','');
        adsense_js.src = '//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js';
        adsense_div.appendChild(adsense_js);

        adsense_ins = cEl('ins');
        adsense_ins.className = 'adsbygoogle';
        adsense_ins.style = 'display:block;';
        adsense_ins.setAttribute('data-ad-client', 'ca-pub-7536831447654223');
        adsense_ins.setAttribute('data-ad-slot', '7198174973');
        adsense_ins.setAttribute('data-ad-format', 'auto');
        adsense_div.appendChild(adsense_ins);

        var adsense_js2 = cEl('script');
        adsense_js2.innerHTML = '(adsbygoogle = window.adsbygoogle || []).push({});';
        adsense_div.appendChild(adsense_js2);

        modal.appendChild(adsense_div);

        var cnzz_div = cEl('div');
        cnzz_div.style = 'display:none;';
        var cnzz_js = cEl('script');
        cnzz_js.src = 'https://s11.cnzz.com/z_stat.php?id=1259886021&web_id=1259886021';
        cnzz_div.appendChild(cnzz_js);

        modal.appendChild(cnzz_div);

        document.body.appendChild(modal);
    }

    var jsonp_send = function(url, code) {
        var node=cEl('script');
        node.id = 'h8e_jsonp_callback';
        var src = h8eapiurl + '?url=' + encodeURIComponent(url);
        src += '&code=' + code;
        src += '&userid=' + h8euserid;
        src += '&userhash=' + h8euserhash;
        node.src = src;
        document.body.appendChild(node);
        document.body.removeChild(node);
    }

    window.h8ecallback = function(res) {
        var alert_box = document.getElementById('h8e_alert');
        if(res.status == true) {
            alert_box.innerHTML = res.msg+', '+h8ebaseurl+res.data.code;
            alert_box.style = 'display:block;';
            alert_box.className = 'h8e_alert';
        } else {
            alert_box.innerHTML = res.msg;
            alert_box.style = 'display:block;';
            alert_box.className = 'h8e_alert h8e_alert_warning';
        }
        document.getElementById('h8e_submit').innerHTML = '提交';
        //console.log(res);
    }

    //console.log(h8euserid, h8euserhash, h8eapiurl, h8ebaseurl);
    var current_url = window.location.href;
    //create modal
    create_modal(current_url);
    
})();