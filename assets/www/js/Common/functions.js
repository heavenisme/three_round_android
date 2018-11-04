/*********************************
 * 公共工具方法
 * add by wilhan.tian
 *********************************/

// 图片URL转真实URL
// @isThumb 是否为缩略图
function converImageUrl(url, isThumb){
	if(3 === isThumb){
	    return AC.SERVER_IP() + url + ".jpg";
	}else if(isThumb){
		return AC.SERVER_IP() + url + "_200.jpg";
	}else{
	return AC.SERVER_IP() + url + "_640.jpg";
	}
}

// TODO
// 时间戳转字符串
function timeToString(time){
	return "2016-1-1 16:30:00";
}

// 验证是否为手机号
function isPhoneNumber(num){
	return /^(1)\d{10}$/i.test(num);
}

// 验证是否为0和正数
// @isIncludeZero
function isPosNumber(num){
	var reg=/^\d+$/;
	return reg.test(num);
}
