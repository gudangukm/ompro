jQuery('.poptamv-btn, .tombol-wa').on('click', function() {
    var title = jQuery(this).attr('data-title');
    var target = jQuery(this).attr('href');
    jQuery(target).addClass('open');
    jQuery(target).find('.title-content').html(title);
    if(jQuery(this).attr('data-img') != null) {
        var img = jQuery(this).attr('data-img');
        jQuery(target).find('.content img').show();
        jQuery(target).find('.content img').attr('src',img);
    }
    if(jQuery(this).attr('data-width') != null) {
        var width = jQuery(this).attr('data-width');
        jQuery(target).find('.wrap').attr('style','max-width:'+width+'px!important;')
    }
    if(jQuery(this).attr('data-tooltip') != null) {
        var tooltip = jQuery(this).attr('data-tooltip');
        jQuery(target).find('.poptamv-wrap').show();
        jQuery(target).find('.poptamv-wrap').html(tooltip)
    }
    if(jQuery(this).attr('data-program') != null) {
        var program_class = jQuery(this).attr('data-program');
        jQuery(target).find('.program').val(program_class);
    }
});

jQuery('.poptamv .closeTamv').on('click', function() {
    jQuery(this).parents('.poptamv').removeClass('open');
});

var web_title = jQuery('title').text();

var audio = document.createElement("audio");
audio.src = "https://cek.jasa-design.web.id/contactform-wa/widget/file/wa.mp3";
audio.preload = "auto";
audio.addEventListener("canplaythrough", function () {
    setTimeout(function(){
        audio.play();
        jQuery('title').text('ðŸ’¬ 1 - ' + web_title);
        jQuery('.waFix').addClass('show');
    }, 1000);
}, false);

jQuery(document).on('click','.waFix', function(){
    jQuery(this).removeClass('show');
    jQuery('title').text(web_title);
});

jQuery(document).on('keypress','.formWA input, .formWA textarea', function() {
    if (event.keyCode === 13) {
        jQuery(this).parents(".formWA").find('.submit').trigger('click');
    }
});

jQuery('.formWA .wajib').each(function() {
    title = jQuery(this).attr('placeholder');
    label = jQuery(this).parents('label');
    jQuery('<span class="validasi"><b>' + title + '</b> (dibutuhkan)</span>').appendTo(label);
});

jQuery(document).on('keyup','.formWA .wajib', function() {
    if (jQuery(this).val() != '') {
        jQuery(this).removeClass('focus');
        jQuery(this).parents('label').find('.validasi').removeClass('show');
    }
});

jQuery(document).on('change','.formWA select', function() {
    jQuery(this).removeClass('focus');
    jQuery(this).parents('label').find('.validasi').removeClass('show');
});

jQuery(document).on('change','.formWA select.nohp', function() {
    var infooo = jQuery(this).val();
    if(infooo == 'Tidak') {
        jQuery('.formWA .nohp_wrap').slideDown();
        jQuery('.formWA .nohp_wrap .no_hpLain').addClass('wajib');
    } else {
        jQuery('.formWA .nohp_wrap').slideUp();
        jQuery('.formWA .nohp_wrap .no_hpLain').removeClass('wajib');
    }
});

jQuery(document).on('click','.formWA .submit', function(){
    kirimWA(jQuery(this).parents('.poptamv').attr('id'));
    return false;
});

function kirimWA(id) {

    var validasi = true;

    jQuery('#'+id+' .wajib').each(function() {
        if (jQuery.trim(jQuery(this).val()) == '' || jQuery.trim(jQuery(this).val()) == 'default') {
            jQuery(this).addClass('focus');
        }
    });
    jQuery('#'+id+' .wajib').each(function() {

        if (jQuery.trim(jQuery(this).val()) == '') {

            validasi = false;

            jQuery(this).parents('label').find('.validasi').addClass('show');
            jQuery(this).focus();
            return false;
        } else if (jQuery.trim(jQuery(this).val()) == 'default') {

            validasi = false;

            jQuery(this).parents('label').find('.validasi').addClass('show');
            return false;
        }
    });

    if (validasi === true) {

        var parameter = '';
        var url_wa = 'https://web.whatsapp.com/send';
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            url_wa = 'whatsapp://send';
        }

        if (id == 'whatsapp_form') {

            var kode_area = 62,
                nomor_whatsapp = 081228131136,
                nama_admin = 'AJ Komputer',
                pesan_salam = 'Halo';

            var judul = jQuery('#'+id+' .title-content').text(),
				namaProduk = jQuery('#'+id+' .namaProduk').val(),
				nama = jQuery('#'+id+' .nama').val(),
				email = jQuery('#'+id+' .email').val(),
				nohp = jQuery('#'+id+' .nohp').val(),
				no_hpLain = jQuery('#'+id+' .no_hpLain').val(),
				alamat = jQuery('#'+id+' .alamat').val(),
				catatan = jQuery('#'+id+' .catatan').val();

            var if_nohp = '';
            if(nohp == 'Tidak') {
                if_nohp = 'No. HP : '+ no_hpLain + '%0A';
            }

            var parameter = url_wa + '?phone=' + kode_area + nomor_whatsapp + '&text=' +
                pesan_salam + ' ' + nama_admin + '.. ' +
                'saya *' + nama + '*, mau beli *' + namaProduk + '.*%0A%0A' +
                if_nohp +
                'E-mail : ' + email + '%0A%0A' +
                'Alamat :%0A' + alamat + '%0A%0A' +
                'ðŸ’¬ Catatan:%0A' + catatan + '%0A%0A' +
                'via ' + location.href;
        } else {
            alert('id tidak ditemukan');
        }

        // alert(parameter);
        jQuery(this).attr('href', parameter);

        var w = 960,
            h = 540,
            left = Number((screen.width / 2) - (w / 2)),
            tops = Number((screen.height / 2) - (h / 2)),
            popupWindow = window.open(this.href, '', 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=yes, resizable=1, copyhistory=no, width=' + w + ', height=' + h + ', top=' + tops + ', left=' + left);
        popupWindow.focus();
        return false;
    }
}
