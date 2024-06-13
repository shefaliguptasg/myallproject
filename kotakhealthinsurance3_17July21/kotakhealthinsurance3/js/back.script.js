$(document).ready(function() {
    // localStorage.clear();
    /* step 1 start */
    var start_box = "";
    var start_box_url = "";

    function validate_myself() {
        var valids = true;
        $('.insurance-step-1 .error').hide();
        if ($('[name="myself_first_date"]').val() == "") {
            valids = false;

            $('.error.first_birth_date').show();
        }
        if ($('[name="myself_first_stay"]').val() == "") {
            valids = false;
            $('.error.first_city').show();
        }
        return valids;
    }

    if ($('body').hasClass('insurance-step-1')) {
        var insurance_for = localStorage.getItem('insurance_for');
           if (insurance_for == 'Myself') {
            localStorage.setItem('child_count', 0);
            var myself_first_date = localStorage.getItem('myself_first_date');
            var myself_first_stay = localStorage.getItem('myself_first_stay');
            $('.myself-btn').trigger('click');
            $('#myself-container').slideDown('fast');
            setTimeout(function() {
                //alert("Hello");
                $('[name="myself_first_date"]').val(myself_first_date);

            }, 500);
            localStorage.setItem('child_count', 0);

            $('[name="myself_first_stay"]').val(myself_first_stay);
            start_box_url = 'myself-2.html';
            start_box = 'myself';
        } else if (insurance_for == 'Family') {
            localStorage.setItem('child_count', 0);
            $('.myfamily-btn').trigger('click');
            start_box_url = 'myfamily-2.html';
            start_box = 'family';

            
        }
        $('.insurance-step-1 .continue-btn').removeClass('grey-background').addClass('red-background')
    }
 

    $('.insurance-step-1 .start-box').click(function() {
        if ($(this).find('h2').text() == "Myself") {
            start_box_url = 'myself-2.html';
            start_box = 'myself';
            $('#myself-container').slideDown('fast');
            localStorage.setItem("insurance_for", "Myself");

        } else {
            start_box_url = 'myfamily-2.html';
            start_box = 'family';
            $('#myself-container').slideUp('fast');
            localStorage.setItem("insurance_for", "Family");
        }
        $('.start-section1').addClass('remove-height')
        $('.insurance-step-1 .continue-btn').removeClass('grey-background').addClass('red-background')
    })
    $('.insurance-step-1 .continue-btn').click(function() { 
            if (start_box != '') {
                if (start_box == 'family') {
                    window.location.href = start_box_url;
                } else {
                    if (validate_myself()) {
                        localStorage.setItem('myself_first_date', $('[name="myself_first_date"]').val());
                        localStorage.setItem('myself_first_stay', $('[name="myself_first_stay"]').val());
                        window.location.href = start_box_url;
                    }
                }

            }
        }) 
        /* step 1 end */
        /* step 2 family start */
    if ($('body').hasClass('myfamily-2')) {     
        var insured_qty_string = localStorage.getItem('insured_qty');
        $('input[name="quantity"]').val(0)
        // $('body.myfamily-2 [value="Self"]').attr('checked', 'checked')
        // debugger
        if (insured_qty_string != null) {
            var insured_qty = insured_qty_string.split(',');    
            for (var x = 0; x <= insured_qty.length - 1; x++) {
                if (insured_qty[x] == 'Self') {
                    $('body.myfamily-2 input[name="insured[]"][value="Self"]').attr('checked', 'checked')
                }
                if (insured_qty[x] == 'Spouse') {
                    // $('body.myfamily-2 input[name="insured[]"][value="Spouse"]').attr('checked', 'checked')
                }
                if (insured_qty[x].indexOf('boys') != -1) {
                    var res = parseInt(insured_qty[x].split("_")[1]);
                    if (res > 0 ){ 
                    $('body.myfamily-2 input[id="Sons"]').attr('checked', 'checked')
                    $('body.myfamily-2 input[id="numberboys"]').val(res)
                    }else{
                      $('body.myfamily-2 input[id="Sons"]').attr('checked', false)   
                    }
                } 
                if (insured_qty[x].indexOf('girls')  != -1) {
                    var res = parseInt(insured_qty[x].split("_")[1]);
                    if (res > 0 ){
                        $('body.myfamily-2 input[id="Girls"]').attr('checked', 'checked')
                        $('body.myfamily-2 input[id="numbergirls"]').val(res)
                    }else{
                        $('body.myfamily-2 input[id="Girls"]').attr('checked', false)
                    }
                } 
                // if (insured_qty[x].indexOf('child') != -1) {
                //     var res = insured_qty[x].split("_");
                //     $('body.myfamily-2 input[name="children"][value="Sons"]').attr('checked', 'checked')
                //     $('input[name="quantity"]').val(res[1]);
                // }
            }
            $('body.myfamily-2 .cont').removeClass('grey-background').addClass('red-background');
        }
    }

    function myfamily_2() {
        var chk = $('body.myfamily-2 input[name="insured[]"]:checked').length;
        if (chk > 0) {
            $('.error.myfamily-2').hide()
            return true;
        } else {
            $('.error.myfamily-2').show()
            return false;
        }
    }

    $('body.myfamily-2 input[name="insured[]"]').click(function() {
        var chk = $('body.myfamily-2 input[name="insured[]"]:checked').length;
        if (chk > 0) {
            $('.error.myfamily-2').hide()
            $('body.myfamily-2 .cont').removeClass('grey-background').addClass('red-background');
        } else {
            $('.error.myfamily-2').show()
            $('body.myfamily-2 .cont').removeClass('red-background').addClass('grey-background');
        }

    })
    $('body.myfamily-2 .cont').click(function() {
            if (myfamily_2()) {
                var insurance_pax = Array();
                var dep_child = 0
                $('input[name="insured[]"]').each(function() {
                    if ($(this).prop('checked')) {
                      insurance_pax.push($(this).val())
                    }
                })
                // if ($('input[name="children"]').prop('checked')) {
                //     var qty = $('[name="quantity"]').val();
                //     insurance_pax.push('children_' + qty)
                // }

               

                if ($('input[id="Sons"]').prop('checked')) {
                    var qty = $('[id="numberboys"]').val();
                    insurance_pax.push('boys_' + qty)
                    dep_child = dep_child + parseInt(qty)  
                }
                if ($('input[id="Girls"]').prop('checked')) {
                    var qty = $('[id="numbergirls"]').val();
                    insurance_pax.push('girls_' + qty)
                    dep_child = dep_child + parseInt(qty ) 
                   
                }
                localStorage.setItem('child_count', dep_child)
                //console.log(insurance_pax);
                localStorage.setItem('insured_qty', insurance_pax);
                window.location.href = 'myfamily-2-1.html';
            }
        })
        /* step 2 family end */

    /* step 3 family start */
    if ($('body').hasClass('family-2-1')) {
        $('#self').datetimepicker({
            "allowInputToggle": true,
            "showClose": true,
            "showClear": true,
            "showTodayButton": true,
            "format": "DD/MM/YYYY",
            "ignoreReadonly": true,
            "maxDate": moment().subtract(18, 'years')
        }).on('dp.change', function(e) {
            dateChanged(e)
        });

        $('#spouse').datetimepicker({
            "allowInputToggle": true,
            "showClose": true,
            "showClear": true,
            "showTodayButton": true,
            "format": "DD/MM/YYYY",
            "ignoreReadonly": true,
            "maxDate": moment().subtract(18, 'years')
        }).on('dp.change', function(e) {
            dateChanged(e)
        });

        $('#child1').datetimepicker({
            "allowInputToggle": true,
            "showClose": true,
            "showClear": true,
            "showTodayButton": true,
            "format": "DD/MM/YYYY",
            "ignoreReadonly": true,
            "minDate": moment().subtract(25.9, 'years'),
            "maxDate": moment().subtract(1, 'day')

        }).on('dp.change', function(e) {
            dateChanged(e)
        });

        $('#child2').datetimepicker({
            "allowInputToggle": true,
            "showClose": true,
            "showClear": true,
            "showTodayButton": true,
            "format": "DD/MM/YYYY",
            "ignoreReadonly": true,
            "minDate": moment().subtract(25.9, 'years'),
            "maxDate": moment().subtract(1, 'day')
        }).on('dp.change', function(e) {
            dateChanged(e)
        });

        $('#child3').datetimepicker({
            "allowInputToggle": true,
            "showClose": true,
            "showClear": true,
            "showTodayButton": true,
            "format": "DD/MM/YYYY",
            "ignoreReadonly": true,
            "minDate": moment().subtract(25.9, 'years'),
            "maxDate": moment().subtract(1, 'day'),

        }).on('dp.change', function(e) {
            dateChanged(e)
        });

        function dateChanged(ev) {
            var x = 0;
            $('.error').hide();
            $('input[rel="active"]').each(function() {
                if ($(this).val() == "") {
                    x = 1;
                }
            })
            if (x == 0) {
                $('.family-2-1-btn').removeClass('grey-background').addClass('red-background')
            }
        }

        $('body').on('click', '.family-2-1-btn.grey-background', function() {
            $('input[rel="active"]').each(function() {
                if ($(this).val() == "") {
                    $(this).parent().parent().find('.error').show();
                }
            })
        })


        $('body').on('click', '.family-2-1-btn.red-background', function() {

            var x = 0;
            $('input[rel="active"]').each(function() {
                if ($(this).val() == "") {
                    x = 1;
                }
            })

            if (x == 0) {
                var bod = {};
                $('input[rel="active"]').each(function() {

                    var input_name = $(this).attr('name');
                    var input_val = $(this).val();
                    bod[input_name] = input_val;
                })
                var member_ages = JSON.stringify(bod);
                localStorage.setItem('member_ages', member_ages);
                window.location.href = 'myfamily-3.html';
            }
        })



        setTimeout(function() {
            //alert("Hello");
            $('.all_containers').find('input').val('');

        }, 100);
        $('.all_containers').hide();


        var insured_qty_string = localStorage.getItem('insured_qty');

        if (insured_qty_string != null) {
            // date creator based on selected checkbox based 
            var insured_qty = insured_qty_string.split(',');
            var child_counts = 0; 
            for (var x = 0; x <= insured_qty.length - 1; x++) {
                if (insured_qty[x] == 'Self') {
                    $('.self_container').show()
                    $('[name="self_age"]').attr('rel', 'active')
                }
                if (insured_qty[x] == 'Spouse') {
                    $('.spouse_container').show()
                    $('[name="spouse_age"]').attr('rel', 'active')
                }
                // old code for text filed 
                // if (insured_qty[x].indexOf('child') != -1) {
                //     var res = insured_qty[x].split("_");
                //     // var child_counts = parseInt(res[1]);
                //     var child_counts = parseInt(localStorage.getItem('child_count'))
                //     for (var x = 1; x <= child_counts; x++) {
                //         $('.child_' + x + '_container').show()
                //         $('[name="child_' + x + '_age"]').attr('rel', 'active')
                //     }
                // }
                // hide show date selectr on bases of boys and daughter selector
                
                if (insured_qty[x].indexOf('boys') != -1) {
                      var res = insured_qty[x].split("_");
                      var boys_cou =  parseInt(insured_qty[x].split("_")[1])  
                      child_count = child_count + boys_cou
                    for (var x = 1; x <= child_counts; x++) {
                        $('.child_' + x + '_container').show()
                        $('.child_' + x + '_container').find('label').text("Dependent Son "+x)
                        $('[name="child_' + x + '_age"]').attr('rel', 'active')
                    }
                }
                if (insured_qty[x].indexOf('girls') != -1) {
                    var res = insured_qty[x].split("_");
                    child_counts = child_count + (parseInt(res[1]) ); 
                    count = 1
                  for (var x = (1+ boys_cou); x <= child_counts; x++) {
                      $('.child_' + x + '_container').show()
                      $('.child_' + x + '_container').find('label').text("Dependent Daughter "+ count)
                      $('[name="child_' + x + '_age"]').attr('rel', 'active')
                      count ++
                  }
              }  
            }
        } else {
            window.location.href = 'myfamily-1.html'
        }



        /* get localstorage values */
        var member_ages2 = localStorage.getItem('member_ages');

        if (member_ages2 != null) {
            setTimeout(function() {
                var obj = JSON.parse(member_ages2);
                $.each(obj, function(key, value) {
                    $('[name="' + key + '"]').val(value);
                });
                $('.family-2-1-btn').removeClass('grey-background').addClass('red-background')
            }, 200);
        }
        /*  */

    }



    /* step 3 family end */


    /* step4 family start */
    if ($('body').hasClass('myfamily-3')) {
        /* SALES SLIDER */

        var slider2 = 500000;
        $('#amount2_words').text(to_words(slider2));
        var options = ["5L", "7.5L", "10L", "12.5L", "15L", "17.5L", "20L"];
        var slider_2 = $("#slider2").slider({
            range: "min",
            min: 500000,
            max: 2000000,
            step: 250000,
            value: slider2,
            slide: function(event, ui) {
                $('.error').text('');
                $("#amount2").val(currencyFormat(ui.value));
                // $(ui.value).val($('#amount2').val());
                $('#amount2_words').text(to_words(ui.value));
            }
        }).slider("pips", {
            rest: "label",
            prefix: "",
            suffix: "",
            step: 1,
            labels: options
        });

        $("#amount2").keyup(function() {
            console.log('not working for keyup')
            slider_2.slider("value", $(this).val())
                //  $("#amount2").val($(this).val());
        });
        /*  */
        var premium_years = localStorage.getItem('premium_years');
        var medical_cover = localStorage.getItem('medical_cover');
        if (medical_cover == 'undefined') {
            medical_cover = null;
        }
        if (premium_years != null) {
            //alert('test')
            $('.select-year-bt a').removeClass('active-btn');
            $('.select-year-bt a[rel="' + premium_years + '"]').addClass('active-btn');
            if (medical_cover != null) {
                var medical_cover_int = parseInt(medical_cover.replace(/,/g, ""));

                $("#amount2").val(medical_cover);

                slider_2.slider("value", medical_cover_int)
            }
        }
        $('body').on('click', '.select-year-bt a', function() {
            // if ((this().data('year'))) {
            //    $("select#amount2 option[selected]").removeAttr("selected");
            // if (typeof this().data('value') !== 'undefined') {
             
            //  }
            // debugger
             if ($(this).attr('rel') === '2' || $(this).attr('rel') === '3') {
                //  alert("click");
                //  $("select#amount2 option[selected]").removeAttr("selected");
                //  $("select#amount2 option").val('Select cover amount');
                 $('select#amount2').prop('selectedIndex',0)

             }          
            $('.select-year-bt a').removeClass('active-btn');
            $(".discoamout .disamo").html("");
            $(this).addClass('active-btn');

            var curRel = $(this).attr("rel");
            if (curRel != "1") {
                $('.discount-panel').slideDown();
                
            }
            else {
                $('.discount-panel').slideUp();
                
            }
        })
        // alert((2.5/100) * 500000) ;
        $('select#amount2').on('change', function() {
            var discount = $(".discount.active-btn").data();
            var valueSelected = this.value;
            // debugger
            // var discoamout = discount.val * valueSelected.val;
            var discoamout = (discount["value"] / 100) * valueSelected;
            console.log(discoamout);
            // $(".discoamout .disamo").append(discoamout);
            $(".discoamout .disamo").html(discoamout);


            // alert(valueSelected);
            // console.log(discoamout)

            // var valueSelected = this.value;
            // alert( this.value );
           
            
          });

   
            // if ( $('a.discount').hasClass('active-btn')) {
            //     $('.discount-panel').slideToggle();
            // }

            // $(".select-year-bt a").each(function(index) {
                
            // });
             
       


        $('.family-3-btn').click(function() {

            var years = $('.select-year-bt').find('a.active-btn').attr('rel')
            localStorage.setItem('premium_years', years);


            var medical_cover = $('[name="medical_cover"]').val()
            localStorage.setItem('medical_cover', medical_cover);
            window.location.href = 'myfamily-4.html'
        })

    }
    /* step4 family end */

    /* step5 family start */
    if ($('body').hasClass('myfamily-4')) {
        var followup_val = localStorage.getItem('followup');
        var awaiting_val = localStorage.getItem('awaiting');
        var suffered_val = localStorage.getItem('suffered');
        if (followup_val != null) {
            $('[name="followup"][value="' + followup_val + '"]').prop('checked', true)
        }
        if (awaiting_val != null) {
            $('[name="awaiting"][value="' + awaiting_val + '"]').prop('checked', true)
        }
        if (suffered_val != null) {

            $('[name="suffered"][value="' + suffered_val + '"]').prop('checked', true)
        }
        if (followup_val != null && awaiting_val != null && suffered_val != null) {

            $('.family-4-btn').removeClass('grey-background').addClass('red-background');
        }
        $('.family-4-btn').click(function() {

            var followup = "";
            var awaiting = "";
            var suffered = "";
            var x = 0;

            $('.error').hide();
            if ($('[name="followup"]').is(':checked')) {
                followup = $('[name="followup"]:checked').val();

            } else {
                x = 1;
                $('.error.followup-error').show()
            }

            if ($('[name="awaiting"]').is(':checked')) {
                awaiting = $('[name="awaiting"]:checked').val();

            } else {
                x = 1;
                $('.error.awaiting-error').show()
            }

            if ($('[name="suffered"]').is(':checked')) {
                suffered = $('[name="suffered"]:checked').val();
            } else {
                x = 1;
                $('.error.suffered-error').show()
            }


            if (x == 1) {

            } else {
                if (followup == 'no' && awaiting == 'no' && suffered == 'no') {

                    window.location.href = 'myfamily-5.html';
                } else {
                    window.location.href = 'thank-you.html';

                }
                $('.family-4-btn').removeClass('grey-background').addClass('red-background');
            }


        })

        $('[name="suffered"]').click(function() {
            $('.error.suffered-error').hide()
            localStorage.setItem('suffered', $('[name="suffered"]:checked').val())
            enable_button()
        })


        $('[name="awaiting"]').click(function() {
            $('.error.awaiting-error').hide()
            localStorage.setItem('awaiting', $('[name="awaiting"]:checked').val())
            enable_button()
        })


        $('[name="followup"]').click(function() {
            $('.error.followup-error').hide()
            localStorage.setItem('followup', $('[name="followup"]:checked').val())
            enable_button()
        })

        function enable_button() {
            if ($('[name="followup"]').is(':checked') && $('[name="awaiting"]').is(':checked') && $('[name="suffered"]').is(':checked')) {
                $('.family-4-btn').removeClass('grey-background').addClass('red-background');
            }
        }

    }
    /* step5 family end */

    /* step6 family start */
    if ($('body').hasClass('myfamily-5')) {
        var premium_years = localStorage.getItem('premium_years');
        var insured_qty = localStorage.getItem('insured_qty');
        if (premium_years != null) {
            $('.premium_years').text(premium_years + ' years');
        }
        if (premium_years <= 1) {
            $('.premium_years').text(premium_years + ' year');
        }
        

        if (insured_qty != null) {
            var insured_qty_arr = insured_qty.split(',');
            var new_arr = Array();
            /*for (var x = 0; x <= insured_qty_arr.length - 1; x++) {
                if (insured_qty_arr[x].indexOf('child') != -1) {
                    var child_arr = insured_qty_arr[x].split('_');
                    if (child_arr[1] == 1) {
                        new_arr.push('1 Child')
                    } else {
                        new_arr.push(child_arr[1] + ' Children')
                    }
                } else {
                    new_arr.push(insured_qty_arr[x]);
                } 
 
            }*/ 
                    
            for (var x = 0; x <= insured_qty_arr.length - 1; x++) {
                if (insured_qty_arr[x].indexOf('boys') != -1) {
                    var child_arr = insured_qty_arr[x].split('_');
                    var child_count = parseInt(insured_qty_arr[x].split('_')[1]);
                    for (var c = 1; c <= child_count ; c++){
                    new_arr.push('Dependent Son '+ c)
                    }
                }
                else if (insured_qty_arr[x].indexOf('girls') != -1) {
                    var child_arr = insured_qty_arr[x].split('_');
                    var child_count = parseInt(insured_qty_arr[x].split('_')[1]);
                    for (var c = 1; c <= child_count ; c++){
                    new_arr.push('Dependent Daughter '+ c)
                    }
                }
                else {
                    new_arr.push(insured_qty_arr[x]);
                }
            }

            $('.insured_qty').text(new_arr.join(', '))
        }





    }
    /* step6 family end */

    /* myself 2 start */
    if ($('body').hasClass('myself-2')) {

        /* SALES SLIDER */

        var slider2 = 500000;
        $('#amount2_words').text(to_words(slider2));
        var options = ["5L", "7.5L", "10L", "12.5L", "15L", "17.5L", "20L"];
        var slider_2 = $("#slider2").slider({
            range: "min",
            min: 500000,
            max: 2000000,
            step: 250000,
            value: slider2,
            slide: function(event, ui) {
                $('.error').text('');
                $("#amount2").val(currencyFormat(ui.value));
                // $(ui.value).val($('#amount2').val());
                $('#amount2_words').text(to_words(ui.value));
            }
        }).slider("pips", {
            rest: "label",
            prefix: "",
            suffix: "",
            step: 1,
            labels: options
        });

        $("#amount2").keyup(function() {
            console.log('not working for keyup')
            slider_2.slider("value", $(this).val())
                //  $("#amount2").val($(this).val());
        });
        /*  */
        var premium_years = localStorage.getItem('premium_years');
        var medical_cover = localStorage.getItem('medical_cover');
        if (medical_cover == 'undefined') {
            medical_cover = null;
        }
        // alert(medical_cover);
        if (premium_years != null) {
            //alert('test')
            $('.select-year-bt a').removeClass('active-btn');
            $('.select-year-bt a[rel="' + premium_years + '"]').addClass('active-btn');
            if (medical_cover != null) {
                var medical_cover_int = parseInt(medical_cover.replace(/,/g, ""));
                $("#amount2").val(medical_cover);
                slider_2.slider("value", medical_cover_int)
            }
        }
        /* $('body').on('click', '.select-year-bt a', function() {
            $('.select-year-bt a').removeClass('active-btn');
            $(this).addClass('active-btn');

            var curRel = $(this).attr("rel");
            if (curRel != "1") {
                $('.discount-panel').slideDown();
            }
            else {
                $('.discount-panel').slideUp();
            }

        })*/

        // new for self-2

        $('body').on('click', '.select-year-bt a', function() {
         
            //    $("select#amount2 option[selected]").removeAttr("selected");
             
            // debugger
             if ($(this).attr('rel') === '2' || $(this).attr('rel') === '3') {
                //  alert("click");
                //  $("select#amount2 option[selected]").removeAttr("selected");
                //  $("select#amount2 option").val('Select cover amount');
                 $('select#amount2').prop('selectedIndex',0)

             }          
            $('.select-year-bt a').removeClass('active-btn');
            $(".discoamout .disamo").html("");
            $(this).addClass('active-btn');

            var curRel = $(this).attr("rel");
            if (curRel != "1") {
                $('.discount-panel').slideDown();
                
            }
            else {
                $('.discount-panel').slideUp();
                
            }
        })

        $('select#amount2').on('change', function() {
            var discount = $(".discount.active-btn").data();
            debugger
            var valueSelected = this.value; 
                // alert(discount['value']);
                console.log(discount['value'])
             var discoamout = (discount["value"] / 100) * valueSelected;
             console.log(discoamout);
             $(".discoamout .disamo").html(discoamout);
     
          });


        //   $('select#amount2').on('change', function() {
        //     var discount = $(".discount.active-btn").data();
        //     var valueSelected = this.value; 
        //     var discoamout = (discount["value"] / 100) * valueSelected;
        //     console.log(discoamout); 
        //     $(".discoamout .disamo").html(discoamout); 
            
        //   });


        $('.myself-2-btn').click(function() {

            var years = $('.select-year-bt').find('a.active-btn').attr('rel')
            localStorage.setItem('premium_years', years);


            var medical_cover = $('[name="medical_cover"]').val()
            localStorage.setItem('medical_cover', medical_cover);
            window.location.href = 'myself-3.html'
        })




    }
    /* myself 2 end */
    /* myself 3 start */
    if ($('body').hasClass('myself-3')) {

        var followup_val = localStorage.getItem('followup');
        var awaiting_val = localStorage.getItem('awaiting');
        var suffered_val = localStorage.getItem('suffered');
        if (followup_val != null) {

            $('[name="followup"][value="' + followup_val + '"]').prop('checked', true)
        }
        if (awaiting_val != null) {
            $('[name="awaiting"][value="' + awaiting_val + '"]').prop('checked', true)
        }
        if (suffered_val != null) {

            $('[name="suffered"][value="' + suffered_val + '"]').prop('checked', true)
        }
        if (followup_val != null && awaiting_val != null && suffered_val != null) {

            $('.myself-3-btn').removeClass('grey-background').addClass('red-background');
        }
        $('.myself-3-btn').click(function() {
            //alert('test')
            var followup = "";
            var awaiting = "";
            var suffered = "";
            var x = 0;

            $('.error').hide();
            if ($('[name="followup"]').is(':checked')) {
                followup = $('[name="followup"]:checked').val();

            } else {
                x = 1;
                $('.error.followup-error').show()
            }

            if ($('[name="awaiting"]').is(':checked')) {
                awaiting = $('[name="awaiting"]:checked').val();

            } else {
                x = 1;
                $('.error.awaiting-error').show()
            }

            if ($('[name="suffered"]').is(':checked')) {
                suffered = $('[name="suffered"]:checked').val();
            } else {
                x = 1;
                $('.error.suffered-error').show()
            }


            if (x == 1) {

            } else {
                if (followup == 'no' && awaiting == 'no' && suffered == 'no') {

                    window.location.href = 'myself-4.html';
                } else {
                    window.location.href = 'thank-you.html';

                }
                $('.myself-3-btn').removeClass('grey-background').addClass('red-background');
            }


        })

        $('[name="suffered"]').click(function() {
            $('.error.suffered-error').hide()
            localStorage.setItem('suffered', $('[name="suffered"]:checked').val())
            enable_button()
        })


        $('[name="awaiting"]').click(function() {
            $('.error.awaiting-error').hide()
            localStorage.setItem('awaiting', $('[name="awaiting"]:checked').val())
            enable_button()
        })


        $('[name="followup"]').click(function() {
            $('.error.followup-error').hide()
            localStorage.setItem('followup', $('[name="followup"]:checked').val())
            enable_button()
        })

        function enable_button() {
            if ($('[name="followup"]').is(':checked') && $('[name="awaiting"]').is(':checked') && $('[name="suffered"]').is(':checked')) {
                $('.myself-3-btn').removeClass('grey-background').addClass('red-background');
            }
        }

    }


    /* myself 3 end */
    /* myself 4 start */
    if ($('body').hasClass('myself-4')) {

        var premium_years = localStorage.getItem('premium_years');
        var insured_qty = localStorage.getItem('insured_qty');
        if (premium_years != null) {
            $('.premium_years').text(premium_years + ' years');
        }
        if (premium_years <= 1) {
            $('.premium_years').text(premium_years + ' year');
        }


        $('.insured_qty').text('self')








        /*  */
    }
    /* myself 4 end */
});

// ----------------------------

$('body.myfamily-2 .back-cta').click(function() {
    debugger
    localStorage.setItem('child_count', localStorage.getItem('child_count'))
});

