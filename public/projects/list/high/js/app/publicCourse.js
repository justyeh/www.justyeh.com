require.config({urlArgs:"v\x3d"+(new Date).getTime(),paths:{jquery:"../libs/jquery-1.9.1.min",bootstrap:"../libs/bootstrap-datetimepicker/bootstrap/js/bootstrap.min",boostrapDatePicker:"../libs/bootstrap-datetimepicker/bootstrap-datetimepicker.min",verify:"../libs/validate/jquery.validate-1.13.1.min",verify_cn:"../libs/validate/jquery_validate_extend_cn"},shim:{bootstrap:{deps:["jquery"]},boostrapDatePicker:{deps:["jquery","bootstrap"]},verify:["jquery"],verify_cn:{deps:["verify"],exports:"verify_cn"}}});require(["jquery","boostrapDatePicker","verify","verify_cn"],function(a){a(function(){a("#time").datetimepicker({minView:"month",format:"yyyy-mm-dd",autoclose:!0});a("form").validate({onfocusout:!1,onkeyup:!1,onclick:!1,rules:{title:"required",teacher:"required",periods:"required",time:"required",place:"required",harvest:{required:!0,minlength:20}},errorPlacement:function(a,b){a.appendTo(b.closest(".input"))}})})});