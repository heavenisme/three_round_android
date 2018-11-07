/**
 * APP 配置文件
 * 定义网络接口
 * 数据配置信息
 * 等..........
 */
var AC = {
	_CHANGE_IP: 0,
	//测试地址
	// _SERVER_IP: "http://101.200.191.150:8080",
	// _SERVER_URL: "http://101.200.191.150:8080/anywide-tribe-management/api/v1/app",
	//     _SERVER_IP  : "http://192.168.0.173:8080",
	//     _SERVER_URL : "http://192.168.0.173:8080/anywide-tribe-management/api/v1/app",
	//正式地址



       _SERVER_IP  : "http://cq.xuduan.tech:45757",
       _SERVER_URL : "http://cq.xuduan.tech:45757/anywide-tribe-management/api/v1/app",

//	   _SERVER_IP  : "http://182.92.219.148:8080",
//	   _SERVER_URL : "http://182.92.219.148:8080/anywide-tribe-management/api/v1/app",

	getDefaultServerList: function () {
		return [
			this._SERVER_IP + "/anywide-tribe-management",
		];
	},

	SERVER_IP: function () {
		return this._SERVER_IP;
	},
	SERVER_URL: function () {
		return this._SERVER_URL;
	},
	set_NEW_SERVER_IP: function (url) {
		this._SERVER_IP = url;
	},
	set_NEW_SERVER_URL: function (url) {
		this._SERVER_URL = url + '/anywide-tribe-management/api/v1/app';
	},
	set_SERVER_URL: function (url) {

		var startIndex = 0;

		if (url.indexOf("http://") == 0) {
			startIndex = 7;
		}
		else if (url.indexOf("https://") == 0) {
			startIndex = 8;
		}

		var endIndex = url.indexOf("/", startIndex);

		this._SERVER_IP = url.substr(startIndex, endIndex - startIndex);

		if (startIndex == 7) {
			this._SERVER_IP = "http://" + this._SERVER_IP;
		}
		else if (startIndex == 8) {
			this._SERVER_IP = "https://" + this._SERVER_IP;
		}

		this._SERVER_URL = url + "/api/v1/app";
	},
	//-------------------------------------------------------------
	// ios升级
	UPGRADE: function () {
		return this._SERVER_URL + "/version/upgrade";
	},
	//-------------------------------------------------------------
	// 获取服务器列表
	GET_SERVER_URL: function () {
		return this._SERVER_URL + "/server/urlAddress"
	},
	//-------------------------------------------------------------
	// 登陆
	USER_LOGIN: function () {
		return this._SERVER_URL + "/user/login";
	},
	// 注销
	USER_LOGOUT: function () {
		return this._SERVER_URL + "/user/logout";
	},
	// 修改密码
	USER_NEW_PASSWORD: function () {
		return this._SERVER_URL + "/user/password";
	},
	// 尝试通过TOKEN登陆
	USER_NEED_LOGIN: function () {
		return this._SERVER_URL + "/user/needlogin";
	},
	// 注册
	USER_REGISTER: function () {
		return this._SERVER_URL + "/user/register";
	},
	// 获取手机验证码
	USER_GET_ACTIVE: function () {
		return this._SERVER_URL + "/user/active";
	},
	// 获取我的投票
	USER_GET_VOTE: function () {
		return this._SERVER_URL + "/userVote/allVoteInfo";
	},
	// 投票
	USER_SET_VOTE: function () {
		return this._SERVER_URL + "/userVote/addVoteRecord";
	},
	// 忘记密码-获取验证码
	USER_GET_VERIFY: function () {
		return this._SERVER_URL + "/user/verify";
	},
	// 忘记密码手机号和验证码校验
	USER_CHECK_VERIFY: function () {
		return this._SERVER_URL + "/user/code";
	},
	// 忘记密码修改密码
	USER_CHANGE_PASSWORD: function () {
		return this._SERVER_URL + "/user/changePassword";
	},
	//-------------------------------------------------------------
	// 查看用户信息
	USER_GET_INFO: function () {
		return this._SERVER_URL + "/user";
	},
	// 取得个人头像
	USER_GET_IMAGE: function () {
		return this._SERVER_URL + "/user/image";
	},
	// 头像上传
	USER_SET_IMAGE: function () {
		return this._SERVER_URL + "/user/header/upload";
	},
	// 修改昵称
	USER_SET_NAME: function () {
		return this._SERVER_URL + "/user/nickname";
	},
	// 修改个性签名
	USER_SET_SIGNATURE: function () {
		return this._SERVER_URL + "/user/signature";
	},
	// 获取标签
	USER_GET_TAGS: function () {
		return this._SERVER_URL + "/tag";
	},
	// 身份升级
	USER_UPDATE: function () {
		return this._SERVER_URL + "/user/role/upgrade";
	},
	// 添加地址
	USER_ADD_ADDRESS: function () {
		return this._SERVER_URL + "/user/address/insert";
	},
	// 取得收货地址列表
	USER_GET_ADDRESSES: function () {
		return this._SERVER_URL + "/user/addresses";
	},
	// 编辑地址
	USER_SET_ADDRESS: function () {
		return this._SERVER_URL + "/user/address/change";
	},
	// 取得单个地址
	USER_GET_ADDRESS: function () {
		return this._SERVER_URL + "/user/address";
	},
	// 删除单个地址
	USER_DELETE_ADDRESS: function () {
		return this._SERVER_URL + "/user/address/delete";
	},
	// 签到
	USER_SIGNON: function () {
		return this._SERVER_URL + "/user/signon";
	},
	// 签到状态
	USER_SIGNON_INFO: function () {
		return this._SERVER_URL + "/user/signon";
	},
	//-------------------------------------------------------------
	// 获取消息概述(类型)
	MSG_GET_SUMMARY: function () {
		return this._SERVER_URL + "/message/selMesType";
	},
	// 获取消息(功能)
	MSG_GET_MESSAGE_LISK: function () {
		return this._SERVER_URL + "/message/selFunType";
	},
	// 获取消息基础信息
	MSG_GET_INFO: function () {
		return this._SERVER_URL + "/message/selMessageInfo";
	},
	// 菜园管理入口 获取酋长选举消息
	GET_CHIEF_VOTE_MSG: function () {
		return this._SERVER_URL + "/message/gain";
	},
	// 查看酋长候选项,查看种植模型候选项,查看种植模型(共通)
	MSG_GET_DETAIL: function () {
		return this._SERVER_URL + "/choiceUtil/allInfo";
	},
	// 添加用户投票信息-消息入口
	ADD_VOTE_RECORD_BY_MSG: function () {
		return this._SERVER_URL + "/userVote/addVoteRecord";
	},
	// 酋长选择种植计划结果并更新种植计划的投票状态-消息入口
	PLANTING_VOTE_BY_MSG: function () {
		return this._SERVER_URL + "/plantingVote/planDecide";
	},
	//-------------------------------------------------------------
	// 公司账户记录
	TRADE_COMPANY_LOG: function () {
		return this._SERVER_URL + "/trade/company";
	},
	// ？？？公司账户金额
	TRADE_COMPANY_: function () {
		return this._SERVER_URL + "/trade/company/？？？";
	},
	// 个人账户交易记录
	TRADE_GET_ACCOUNT_RECORD: function () {
		return this._SERVER_URL + "/trade/account/record";
	},
	// 取得账户中的与余额
	TRADE_GET_ACCOUNT: function () {
		return this._SERVER_URL + "/trade/account";
	},
	// 付款完成
	TRADE_PAY_COMPLETE: function () {
		return this._SERVER_URL + "/trade/user/account/complete";
	},
	// 向个人账户充值(二次确认)
	TRADE_SET_ACCOUNT: function () {
		return this._SERVER_URL + "/trade/user/account/insert";
	},
	// 付款完成
	TRADE_COMPLETE_ACCOUNT: function () {
		return this._SERVER_URL + "/trade/user/account/complete";
	},
	// 从个人账户中提现
	TRADE_ACCOUNT_WITHDRAWAL: function () {
		return this._SERVER_URL + "/trade/account/withdrawal";
	},
	// 向公司消费
	TRADE_COMPANY_EXPENSE: function () {
		return this._SERVER_URL + "/trade/toCompany/expense";
	},
	// 想商户消费
	TRADE_BUSINESS_EXPENSE: function () {
		return this._SERVER_URL + "/trade/toBusiness/expense";
	},
	// 生成流水号
	TRADE_GET_SERIAL_NUMBER: function () {
		return this._SERVER_URL + "/trade/serialNumber";
	},
	//-------------------------------------------------------------
	// 获取种植模型(种植计划)列表
	GARDEN_GET_PLANTING: function () {
		return this._SERVER_URL + "/planting/plan";
	},
	GARDEN_GET_PLANTING_DETAIL: function () {
		return this._SERVER_URL + "/planting/plan/detail";
	},
	//-------------------------------------------------------------
	// 获取大棚列表
	GREENHOUSE_GET_GREENHOUSE: function () {
		return this._SERVER_URL + "/landmarket/greenhouselist";
	},
	// 获取大棚详细内容
	GREENHOUSE_GET_INFO: function () {
		return this._SERVER_URL + "/landmarket/greenhouseinfo";
	},
	// 大棚转让或取消转让
	GREENHOUSE_RESELL: function () {
		return this._SERVER_URL + "/landmarket/transfer"; //.../transfer/{landId}/{status}
	},

    // 大棚托管或取消托管
    GREENHOUSE_TRUSTEESHIP: function () {
        return this._SERVER_URL + "/landmarket/trusteeship"; //.../transfer/{landId}/{status}
    },

	// 获取菜园管理中的各种图
	GARDEN_GET_IMAGE: function () {
		return this._SERVER_URL + "/garden/image";
	},
	// 获取大棚种植模型选择状态
	GARDEN_GET_SELPLANTING: function () {
		return this._SERVER_URL + "/garden/selPlanting";
	},
	// 通过houseId获取种当前激活的模型
	GARDEN_GET_ACTIVE_MODEL: function () {
		return this._SERVER_URL + "/planting/plan/active";
	},
	// 发起种植模型投票
	GREENHOUSE_START_VOTE: function () {
		return this._SERVER_URL + "/plantingVote/updateState";
	},
	// 耘客获取选择大棚种植计划投票状态是否开启
	GREENHOUSE_VOTE_ISOPEN: function () {
		return this._SERVER_URL + "/plantingVote/selectState";
	},
	// 会员获取大棚下各种植计划的投票数和投票总数
	GREENHOUSE_VOTING_RATE: function () {
		return this._SERVER_URL + "/plantingVote/votingRate";
	},
	// 耘客投票选择大棚的种植计划
	GREENHOUSE_SET_VOTING_ITEM: function () {
		return this._SERVER_URL + "/plantingVote/userVote";
	},
	//-------------------------------------------------------------
	// 协议
	BUYLAND_AGREEMENT: function () {
		return this._SERVER_URL + "/landmarket/agreement";
	},
	LOGIN_AGREEMENT: function () {
		return this._SERVER_URL + "/user/agreement";
	},
	//-------------------------------------------------------------
	// 订单
	ORDER_BASE: function () {
		return this._SERVER_URL + "/order";
	},
	ORDER_ADD: function () {
		return this._SERVER_URL + "/order/order";
	},
	ORDER_GET_LIST: function () {
		return this._SERVER_URL + "/order/getorderlist";
	},
	UPDATE_ORDER_STATUS: function () {
		return this._SERVER_URL + "/order/updateOrderStatus";
	},
	SHOPPING_CART_GOODS: function () {
		return this._SERVER_URL + "/shoppingCartGoods";
	},
	TRADE_BASE: function () {
		return this._SERVER_URL + "/trade";
	},
	GET_SERIAL_NUMBER: function () {
		return this._SERVER_URL + "/trade/serialNumber";
	},
	PAY: function () {
		return this._SERVER_URL + "/trade/pay";
	},
	GET_MY_GREENHOUSE: function () {
		return this._SERVER_URL + "/user/myhouse";
	},
	GET_GREENHOUSE_INFO: function () {
		return this._SERVER_URL + "/user/house";
	},
	GET_GREENHOUSE_LAND: function () {
		return this._SERVER_URL + "/user/land";
	},
	GET_GREENHOUSE_TRIBE: function () {
		return this._SERVER_URL + "/user/tribe"
	},
	GET_ABOUT_US: function () {
		return this._SERVER_URL + "/user/aboutUs";
	},
	GET_TASK_LIST: function () {
		return this._SERVER_URL + "/daily/task/summary/house";
	},
	GET_TASK_INFO_DETAILS: function () {
		return this._SERVER_URL + "/daily/task/detail";
	},
	GET_TASK_IMAGES: function () {
		return this._SERVER_URL + "/daily/task/images";
	},
	GET_TASK_MATERIALS: function () {
		return this._SERVER_URL + "/daily/task/resources";
	},
	GET_PLANT_MINIATURE: function () {
		return this._SERVER_URL + "/house/images";
	},
	// 物资方案选择
	GET_Material_Plan: function () {
		return this._SERVER_URL + "/daily/task/projects";
	},
	// 酋长选择物资方案
	Choose_Material_Plan: function () {
		return this._SERVER_URL + "/daily/task/project";
	},
	// 做点什么
	GREENHOUSE_DO_SOMETHING: function () {
		return this._SERVER_URL + "/daily/task/projects/house"; // ?houseId
	},
	//采收计划详情
	GET_RECOVER_INFO_DETAILS: function () {
		return this._SERVER_URL + "/harvestplan/getharvesmethod";
	},
	//采收计划列表
	GET_RECOVER_LIST: function () {
		return this._SERVER_URL + "/harvestplan/getharvesmethodlist";
	},
	//采收计划反馈-包装方式
	GET_RECOVER_PACK_WAY: function () {
		return this._SERVER_URL + "/harvestplan/getpackingmethod";
	},
	//配送方式温馨提示
	GET_RECOVER_DELIVERY_REMINDER: function () {
		return this._SERVER_URL + "/harvestplan/getdeliveryreminder";
	},
	//配送方式便利店列表
	GET_RECOVER_DELIVERY_STORE_LIST: function () {
		return this._SERVER_URL + "/harvestplan/getstorelist";
	},
	//配送地址列表
	GET_RECOVER_DELIVERY_ADDRESS_LIST: function () {
		return this._SERVER_URL + "/harvestplan/getaddresslist";
	},
	//新增收货地址
	ADD_DELIVERY_ADDRESS: function () {
		return this._SERVER_URL + "/harvestplan/addaddress";
	},
	//编辑收货地址
	UPDATE_ADDRESS: function () {
		return this._SERVER_URL + "/harvestplan/updateaddress";
	},
	//采收计划提交
	SUBMIT_RECOVER: function () {
		return this._SERVER_URL + "/harvestplan/deliver";
	},
	//采收计划-配送方式快递信息
	RECOVER_DELIVERY_EXPRESS: function () {
		return this._SERVER_URL + "/harvestplan/getexpresslist";
	},
	//采收计划状态
	RECOVER_STATE: function () {
		return this._SERVER_URL + "/harvestplan/handle";
	},
	//部落市场列表
	GET_TRIBEMARKET_LIST: function () {
		return this._SERVER_URL + "/tribalMarket/getCommodityList";
	},
	//今日指导价格列表getCroppriceList
	GET_CROPPRICE_LIST: function () {
		return this._SERVER_URL + "/tribalMarket/getCroppriceList";
	},
	//商家报价getCommodityListByKindId
	GET_COMMODITY_LIST_BY_KINDID: function () {
		return this._SERVER_URL + "/tribalMarket/getCommodityListByKindId";
	},
	//商品详细getCommodityInfo
	GET_COMMODITY_INFO: function () {
		return this._SERVER_URL + "/tribalMarket/getCommodityInfo";
	},
	/*    //生长周期
		GET_GROWTHCYCLE_INFO :function(){
			return this._SERVER_URL + "/tribalMarket/getGrowthCycleInfo";
		},*/
	//生长周期
	GET_GROWTHCYCLE_INFO: function () {
		return this._SERVER_URL + "/tribalMarket/commodity/";
	},
	//推荐商品commendGoods
	GET_COMMEND_GOODS: function () {
		return this._SERVER_URL + "/tribalMarket/commodity/rest";
	},
	//部落市场下订单
	TRIBEMARKET_ORDER: function () {
		return this._SERVER_URL + "/tribalMarket/buy";
	},
	//农趣活动列表
	GET_TRIBEACTIVE_LIST: function () {
		return this._SERVER_URL + "/FarmParty/getFramPartyList";
	},
	//农趣活动详情
	TRIBEACTIVE_DETAIL: function () {
		return this._SERVER_URL + "/FarmParty/getFramParty";
	},
	//我的店铺--商品管理
	MYSHOP_PRODUCT_MANAGEMENT: function () {
		return this._SERVER_URL + "/MyShop/getCommodity";
	},
	//我的店铺
	GET_MYSHOP_INFO: function () {
		return this._SERVER_URL + "/MyShop/getMyShopInfo";
	},
	//更新店铺信息
	UPDATE_SHOPMESSAGE: function () {
		return this._SERVER_URL + "/MyShop/updateMyShopInfo";
	},
	//更新背景图片
	UPDATE_BACKGROUND: function () {
		return this._SERVER_URL + "/MyShop/updateBackground";
	},
	//上架管理
	PUTAWAY: function () {
		return this._SERVER_URL + "/MyShop/getPutaway";
	},
	//我的店铺--更新店铺信息
	UPDATE_MYSHOP_INFO: function () {
		return this._SERVER_URL + "/MyShop/updateCommodityInfo"
	},
	//价格管理
	PRICEMANAGEMENT: function () {
		return this._SERVER_URL + "/MyShop/getPriceManagement";
	},
	// 我售出的订单  /api/v1/app/myOrder/shop/{no}
	MY_SELLED_ORDER: function () {
		return this._SERVER_URL + "/myOrder/shop";
	},
	//购买--部落市场
	TRIBEMARKET_BUY: function () {
		return this._SERVER_URL + "/tribalMarket/buy";
	},
	//部落市场---付款回调
	TRIBEMARKET_BUYCALLBACK: function () {
		return this._SERVER_URL + "/tribalMarket/buyCallBack";
	},
	//农趣活动 -- 报名
	ACTIVE_REGISTER: function () {
		return this._SERVER_URL + "/FarmParty/apply";
	},
	//农趣活动--历史活动
	ACTIVE_HISTORY: function () {
		return this._SERVER_URL + "/FarmParty/getHistoricalAct";
	},
	//我的订单------全部
	ORDER_GETALL: function () {
		return this._SERVER_URL + "/myOrder/getAll";
	},
	//我的订单------待付款
	ORDER_GETPENDINGPAYMENT: function () {
		return this._SERVER_URL + "/myOrder/getPendingPayment";
	},
	//我的订单------待发货
	ORDER_GETREADYTOSHIP: function () {
		return this._SERVER_URL + "/myOrder/getReadyToShip";
	},
	//我的订单------待收货
	ORDER_GETRECEIPTOFGOODS: function () {
		return this._SERVER_URL + "/myOrder/getReceiptOfGoods";
	},
	//我的订单------确认收货
	ORDER_CONFIRMGOODS: function () {
		return this._SERVER_URL + "/myOrder/order/";
	},
	//我的订单自留------确认收货
	ORDER_CONFIRMGOODSFORSELF: function () {
		return this._SERVER_URL + "/myOrder/own/";
	},
	//扫描二维码----确认收货
	SCAN_CONFIRMGOODS: function () {
		return this._SERVER_URL + "/user/package";// /{packageCode}
	},
	//部落市场开放时间
	TRIBEMARKET_OPEN: function () {
		return this._SERVER_URL + "/tribalMarket/authorization";

	},
	//判断是否有配送费
	DELIVERYCOST: function () {
		return this._SERVER_URL + "/tribalMarket/delivery/cost/";

	},
	//可选择配送日期
	DELIVERY_TIME: function () {
		return this._SERVER_URL + "/harvestplan/days";
	},
	//部落市场--可选择配送日期
	TRIBEMARKET_TIME: function () {
		return this._SERVER_URL + "/tribalMarket/days";
	},
	//二维码
	SCAN_LIST: function () {
		return this._SERVER_URL + "/user/crop";
	},
	//农事列表
	FARMING_LIST: function () {
		return this._SERVER_URL + "/farm/work/plan";
	},
	//获取农事活动--预约规则
	GETWORKRULE: function () {
		return this._SERVER_URL + "/farm/work/rule";
	},
	//农事活动预约
	FARMING_APPOINT: function () {
		return this._SERVER_URL + "/farm/work/appointment";
	},
	//农事活动查看预约结果
	FARMING_RESULT: function () {
		return this._SERVER_URL + "/farm/work/appointment";
	},
	//农事活动取消预约
	FARMING_CANCLE: function () {
		return this._SERVER_URL + "/farm/work/appointment";
	},
	//-------------------------------------------------------------
	//用户积分信息
	POINT_INFO: function () {
		return this._SERVER_URL + "/point/info";
	},
	//用户积分变更历史
	POINT_HISTORY: function () {
		return this._SERVER_URL + "/point/history";
	},
	//积分兑换物品列表
	POINT_ITEMS: function () {
		return this._SERVER_URL + "/point/items";
	},
	//用户积分兑换历史
	POINT_USER_ITEMS: function () {
		return this._SERVER_URL + "/point/user/items";
	},
	//申请兑换积分物品 POST {item_id, redeem_number}
	POINT_ITEM: function () {
		return this._SERVER_URL + "/point/item";
	},
	//积分等级信息
	POINT_LEVEL: function () {
		return this._SERVER_URL + "/point/level";
	},
};
// alert(AC.GET_GREENHOUSE_TRIBE());

//-------------------------------------------------------------
// 服务器地址
// var SERVER_IP  = "http://182.92.219.148:8080";
// var SERVER_IP  = "http://101.200.191.150:8080";
// var SERVER_IP  = "http://192.168.0.128:8080";
// var SERVER_IP  = "http://192.168.0.128:8080";
// var SERVER_IP  = "http://192.168.0.111:8080";
//var SERVER_IP  = "http://182.92.219.148:8080";
// var SERVER_IP  = "http://192.168.0.142:8080";
// var SERVER_IP  = "http://192.168.0.162:8080";
//-------------------------------------------------------------
// var SERVER_URL = SERVER_IP + "/anywide-tribe-management/api/v1/app";
