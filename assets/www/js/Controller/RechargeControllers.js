// 充值-控制器
angular.module('starter.RechargeControllers', [])

//从paymode跳转到paypage页面
.controller('PayCtrl', function($scope, $stateParams, $ionicLoading, $state, $ionicHistory, $ionicPopup,
    UserService, OrderService, MyTribeService, MyBalanceService, RecoverService, TribeMarketService, TribeActiveService, PayService
    ) {
	//----------------------------------------------------
	// 数据
	$scope.data = {
		title : "",
		orderId : "",
		orderPrice : 0.00,
		description : "",
		currMode : -1, // 0: 支付, 1: 充值
		userAmount : 0.00,
		tribalMarketBuy : false,
		params : {}//部落市场用
	};
	//部落市场需要的参数
	$scope.buycallbackParam = {
		order_id : 0,
		paid : 0//是否支付配送费用
	};
	//部落市场需要的参数
	$scope.tribeMarketParams = {
		order_number : 0, //接口返回的orderid
		order_status : 0, //1  支付失败 2 支付成功
		seller_id : 0, //商铺id
		commodity_id : 0, //商品id
		commodity_name : "", //商品名称
		commodity_number : 0, //商品数量
		commodity_price : 0, //商品单价
		total_price : 0, //订单总额
		package_id : 0, //包装方式id
		payment_mode : 1, //支付方式(1:微信  2:余额)
		delivery_type : 0, //配送方式(1.自提  2.会友  3.快递)
		address_id : 0, //配送地址id
		express_id : 0, //快递公司id
		total_price : 0, //总额
		create_id : 1//购买会员id
	};

	$scope.typePage = $stateParams.typePage;
	console.log("===================" + $stateParams.typePage);
	console.log("===================" + $scope.typePage);

  PayService.setNowPayPageFrom($stateParams.from);

	//部落市场回调
	$scope.tribeMarketCallback = {
		order_id : 0,
		commodity_id : 0,
		commodity_number : 0
	};
	//判断是否为ios平台下
	$scope.ios = (UserService.getCurrPlatform() == "ios");

	if ($stateParams.from == 'Greenhouse') {
		$scope.data.title = "支付";
		$scope.data.orderId = $stateParams.orderId;
		$scope.data.orderPrice = $stateParams.orderPrice;
		$scope.data.description = $stateParams.description;
		$scope.data.currMode = 0;
		$scope.data.orderType = 1;
		//        alert("data : " + $scope.data.orderId + ", " + $scope.data.orderPrice +
		// ", " + $scope.data.description);
	} else if ($stateParams.from == 'DeliveryWay') {
		$scope.data.title = "支付";
		$scope.data.orderId = $stateParams.orderId;
		$scope.data.orderPrice = $stateParams.orderPrice;
		$scope.data.description = $stateParams.description;
		$scope.data.currMode = 0;
		$scope.data.orderType = 3;
	} else if ($stateParams.from == 'TribeMarket') {
		$scope.data.title = "支付";
		$scope.data.orderId = $stateParams.orderId;
		$scope.data.orderPrice = $stateParams.orderPrice;
		$scope.data.description = $stateParams.description;
		$scope.data.currMode = 0;
		$scope.data.orderType = 2;
		$scope.data.paramas = RecoverService.get();
		$scope.data.paid = TribeMarketService.get();
		console.log(JSON.stringify($scope.data));
	} else if ($stateParams.from == 'TribeActive') {
		$scope.data.title = "支付";
		$scope.data.orderId = $stateParams.orderId;
		$scope.data.orderPrice = $stateParams.orderPrice;
		$scope.data.description = $stateParams.description;
		$scope.data.currMode = 0;
		$scope.data.orderType = 4;
		$scope.data.paramas = TribeActiveService.get();
	} else {
		$scope.data.title = "充值";
		$scope.data.currMode = 1;
		$scope.data.orderType = 5;
	}

	// 返回上一页
	$scope.goBack = function() {
		if ($scope.data.orderType == 2) {
			$state.go("myOrder", {
				'from' : 'tab-my',
				'index' : undefined
			});
		} else {
			$ionicHistory.goBack();
		}
	};

	// 去支付
	var lastClickTime = 0;
	//上次点击时间
	$scope.switcher = function(payType) {
		// 订单价格检查
		// 充值时不判断
		if ($scope.data.currMode != 1 && ($scope.data.orderPrice == null || $scope.data.orderPrice < 0.0001)) {
			var alertPopup = $ionicPopup.alert({
				title : '提示',
				template : '支付金额异常',
				buttons : [{
					text : '知道了'
				}]
			});
			return;
		}

		var nowTime = new Date().getTime();
		if (nowTime - lastClickTime < 3600) {
			return;
		} else {
			lastClickTime = nowTime;
		}

		if (payType == 3 || payType == 4) {
			// TODO 支付宝
			$ionicPopup.alert({
				title : '提示',
				template : '尚未开通，敬请期待',
				buttons : [{
					text : '知道了'
				}]
			});
			return;
		}

		// 以下使用余额支付
		if ($scope.data.currMode == 0) {
        $scope.choosePayType(payType);
    } else if ($scope.data.currMode == 1) {
        $scope.payClick();
    }
	};

	$scope.payClick = function() {
		$state.go("payPage");
	};

	$scope.choosePayType = function(payType) {
		$scope.payoff($scope.data.orderId, $scope.data.orderPrice, $scope.data.description, payType);
	};
	//----------------------------------------------------
	// 去付款(第一步)
	$scope.payoff = function(orderId, orderPrice, description, payType) {
		// 弹出载入层
		$ionicLoading.show({
			template : '<ion-spinner icon="bubbles" class="spinner-balanced"></ion-spinner>'
		});

		OrderService.getSerialNumber(UserService.getUserId()).success(function(data) {
			$ionicLoading.hide();
			// 获取流水号成功
			if (data.code == 200) {
				var serialNumber = data.data[0].serialNumber;
				if (payType == 1) {
					if ($scope.data.userAmount - orderPrice < 0) {
						var alertPopup = $ionicPopup.alert({
							title : '提示',
							template : '账户余额不足',
							buttons : [{
								text : '知道了'
							}]
						});
					} else {
						//账户支付
						var confirmPopup = $ionicPopup.confirm({
                title: '<strong>提示</strong>',
                template: '使用余额支付' + orderPrice + "元",
                okText: '确定',
                cancelText: '取消'
            });

            confirmPopup.then(function (res) {
                if (res) {
                    $scope.pay(serialNumber, orderId, orderPrice, description, payType);
                }
            });
//						$scope.pay(serialNumber, orderId, orderPrice, description, payType);
					}
				} else if (payType == 2) {
					//微信支付
					$scope.pay(serialNumber, orderId, orderPrice, description, payType);
				} else if (payType == 3) {
					// TODO 支付宝
				} else if (payType == 4) {
					// TODO 财付通
				}
			} else {
				var alertPopup = $ionicPopup.alert({
					title : '提示',
					template : '' + data.message,
					buttons : [{
						text : '知道了'
					}]
				});
			}
		}).error(function(data) {
			// alert(data);
			console.log("=====> error:" + data);
			$ionicLoading.hide();
			var alertPopup = $ionicPopup.alert({
				title : '提示',
				template : '网络异常',
				buttons : [{
					text : '知道了'
				}]
			});
		});
	};

	//----------------------------------------------------
	// 去付款(第二步)
	$scope.pay = function(serialNumber, orderId, orderPrice, description, payType) {

		var iMoney = parseInt(orderPrice * 100);

		$ionicLoading.show({
			template : '<ion-spinner icon="bubbles" class="spinner-balanced"></ion-spinner>',
			duration : 5000
		});
		var orderType = $scope.data.orderType;

		OrderService.payoff(serialNumber, UserService.getUserId(), orderId, orderPrice, description, payType, orderType).success(function(data) {

			// 成功
			if (data.code == 200) {
				if (payType == 1) {
					$scope.payComplete(orderId, serialNumber, payType);
				}
				if (payType == 2) {
					// 微信支付
					HXPay.payWeChat(iMoney, description, description, "" + serialNumber, "notifyUrl:", function(msg) {
						$scope.payComplete(orderId, serialNumber, payType);
					}, function(msg) {
						// TODO 付款失败
						//$ionicLoading.hide();
					});
				}
			} else {
				$ionicPopup.alert({
					title : '提示',
					template : data.message,
					buttons : [{
						text : '知道了'
					}]
				});
			}
		}).error(function(data) {
			// alert(data);
			console.log("=====> error:" + data);
			var alertPopup = $ionicPopup.alert({
				title : '提示',
				template : '网络异常',
				buttons : [{
					text : '知道了'
				}]
			});
		});
	};

	//----------------------------------------------------
	// 完成付款(第三步)
	$scope.payComplete = function(orderId, serialNumber, payType) {
		var orderType = $scope.data.orderType;
		OrderService.payComplete(UserService.getUserId(), serialNumber, orderType, payType).success(function(data) {
			if (data.code == 200) {
				if (3 == $scope.data.orderType) {
					//支付成功 提交采收计划
					$scope.goSubmit();
				} else if (2 == $scope.data.orderType) {
					$scope.getbuycallbackParam();
					console.log(JSON.stringify($scope.buycallbackParam) + "========================================出来参数啊");
					//TribeMarketService.buyCallBack($scope.buycallbackParam);
					$scope.TribeCallBack($scope.buycallbackParam);
				} else if (4 == $scope.data.orderType) {
					$scope.tribeActiveApply();
				} else {
					$scope.updateOrderStatus(orderId, 5);
				}
			}
		}).error(function(msg) {
			$ionicPopup.alert({
				title : '提示',
				template : '结算失败, 请联系客服进行退款申诉。',
				buttons : [{
					text : '知道了'
				}]
			});
		});
	};

	//----------------------------------------------------
	//部落市场支付成功更新订单状态
	$scope.TribeCallBack = function(data) {
		TribeMarketService.buyCallBack(data).success(function(data) {
			$ionicLoading.hide();
			// 成功
			if (data.code == 200) {
				var alertPopup = $ionicPopup.alert({
					title : '提示',
					template : '交易成功',
					buttons : [{
						text : '知道了',
						onTap : function(e) {
							if ($scope.typePage == 1) {
								$ionicHistory.goBack();
							} else {
								$state.go('tribeMarket');
							}
						}
					}]
				});
			} else {
				var alertPopup = $ionicPopup.alert({
					title : '提示',
					template : '' + data.message,
					buttons : [{
						text : '知道了',
						onTap : function(e) {
							$state.go('tribeMarket');
						}
					}]
				});
			}
		}).error(function(data) {
			var alertPopup = $ionicPopup.alert({
				title : '提示',
				template : '网络异常',
				buttons : [{
					text : '知道了'
				}]
			});
		});
	};
	// 更新订单状态(第四步)
	$scope.updateOrderStatus = function(orderId, newStatus) {
		OrderService.updateOrderStatus(UserService.getUserId(), orderId, newStatus).success(function(data) {
			$ionicLoading.hide();
			// 成功
			if (data.code == 200) {
				//                   alert("updateOrderStatus == > "+JSON.stringify(data))
				if (data.message == 'success') {
					var alertPopup = $ionicPopup.alert({
						title : '提示',
						template : '购买成功',
						buttons : [{
							text : '知道了',
							onTap : function() {
								//支付成功后跳转菜园管理页面
								$state.go("tab.garden", null, {
									reload : true
								});
							}
						}]
					});
				}

				//$state.go("tab.my");
				// 获取我的大棚
				$scope.getMyGreenHouse();
				// 更新标签
				PushFSM.updateTagAndAlias(UserService);
			} else {
				var alertPopup = $ionicPopup.alert({
					title : '提示',
					template : '' + data.message,
					buttons : [{
						text : '知道了'
					}]
				});
			}
		}).error(function(data) {
			// alert(data);
			//              $ionicLoading.hide();
			console.log("=====> error:" + data);
			var alertPopup = $ionicPopup.alert({
				title : '提示',
				template : '网络异常',
				buttons : [{
					text : '知道了'
				}]
			});
		});
	};

	//----------------------------------------------------
	// 获取属于我的大棚列表
	$scope.getMyGreenHouse = function() {

		MyTribeService.getMyGreenHouse(UserService.getUserId()).success(function(data) {
			if (data.code == 200) {
				UserService.setMyGreenHouseList(data.data);
			}
		}).error(function(state) {

		});
	};

	//----------------------------------------------------
	// 获取账户余额
	$scope.getBalance = function() {
		MyBalanceService.getMyBalance(UserService.getUserId()).success(function(data) {
			//                alert(JSON.stringify(data));

			if (data.code == 200) {
				$scope.data.userAmount = data.data[0].user_amount;
			}
		}).error(function(state) {

		});
	};
	//---------------- 采收计划提交------------------------------------
	$scope.goSubmit = function() {
		var params = RecoverService.get();
		params.paid = 1;
		console.log(JSON.stringify(params) + "----------------------------------采收计划提交参数");
		RecoverService.submitRecover(params).success(function(data) {
			$ionicLoading.hide();
			if (data.flag = 1) {
				var alertPopup = $ionicPopup.alert({
					title : '提示',
					template : '采收计划提交成功',
					buttons : [{
						text : '知道了'
					}]
				});
			}
			$state.go("tab.garden");
		}).error(function(state) {
			$ionicLoading.hide();
			var alertPopup = $ionicPopup.alert({
				title : '提示',
				template : '网络异常',
				buttons : [{
					text : '知道了'
				}]
			});
		});
	};
	//------------------农趣活动提交--------------
	$scope.tribeActiveApply = function() {
		console.log(JSON.stringify($scope.data.paramas) + "------------------------------------农趣活动提交");
		TribeActiveService.activeRegister($scope.data.paramas).success(function(data) {
			$ionicLoading.hide();
			if (200 == data.code) {
				var alertPopup = $ionicPopup.alert({
					title : '提示',
					template : '预约成功',
					buttons : [{
						text : '知道了',
						onTap : function(e) {
							$state.go('tribeActive');
						}
					}]
				});
			} else if (3303 == data.code) {
				var alertPopup = $ionicPopup.alert({
					title : '提示',
					template : '报名人数已满',
					buttons : [{
						text : '知道了',
						onTap : function(e) {
							$ionicHistory.goBack();
						}
					}]
				});
			}
			console.log("预约：" + JSON.stringify(data));
		}).error(function(state) {
			$ionicLoading.hide();
			var alertPopup = $ionicPopup.alert({
				title : '提示',
				template : '网络异常',
				buttons : [{
					text : '知道了'
				}]
			});
		});
	};
	//------------------部落市场--------------
	$scope.tribalMarketBuy = function(data) {
		TribeMarketService.buy(data).success(function(data) {
			$ionicLoading.hide();
			if (data.flag = 1) {
				var alertPopup = $ionicPopup.alert({
					title : '提示',
					template : '交易成功',
					buttons : [{
						text : '知道了'
					}]
				});
				$state.go('tab.home');
			}
		}).error(function(state) {
			$ionicLoading.hide();
			var alertPopup = $ionicPopup.alert({
				title : '提示',
				template : '网络异常',
				buttons : [{
					text : '知道了'
				}]
			});
		});
	};
	//-----------------------------部落市场获取参数----------------------
	$scope.getbuycallbackParam = function() {
		$scope.buycallbackParam.order_id = $scope.data.paramas.order_id;
		//订单id
		$scope.buycallbackParam.paid = $scope.data.paid;
		//已经支付费用
	};
	// PayController END.
})

// 微信页面金额控制
.controller('SelectMoneyCtrl', function($scope, $ionicLoading, $state, $ionicPopup,
    PayService, UserService, OrderService) {
	//----------------------------------------------------
	// 数据
	$scope.data = {};
	$scope.data.money = "";
	$scope.isDisabled = true;
	$scope.payType = 2;
	//平台类型  2微信, 3支付宝, 4财付通
	$scope.orderNumber = '';
	$scope.orderType = 5; // 充值
	//订单类型：充值
	$scope.description = "充值";

	//----------------------------------------------------
	// 监控data.money数据变化
	$scope.$watch('data.money', function(newVal, oldVal) {

		if (newVal != "" && newVal > 0) {
			$scope.isDisabled = false;
		} else {
			$scope.isDisabled = true;
		}
	});
	//----------------------------------------------------
	// 改变金钱数
	$scope.selectMoney = function(money) {
		$scope.data.money = money;
	};
	//----------------------------------------------------

	// 发起支付
	$scope.pay = function() {

		// 这里需要将正常元单位转换成分单位
		var fMoney = parseFloat($scope.data.money) * 100;
		var iMoney = parseInt(fMoney);

		if (iMoney > 0) {
			// 弹出载入层
			$ionicLoading.show({
				template : '<ion-spinner icon="bubbles" class="spinner-balanced"></ion-spinner>'
			});

			//下订单
			OrderService.addOrder(UserService.getUserId(), parseFloat($scope.data.money), "[]", $scope.orderType)
			.success(function(data) {
				$ionicLoading.hide();
				if (data.code == 200) {
					$ionicLoading.show({
						template : '<ion-spinner icon="bubbles" class="spinner-balanced"></ion-spinner>',
						duration : 5000
					});
					$scope.orderNumber = data.data[0].orderid;
					// 获取流水号
					$scope.getSerialNumber(iMoney);
				} else {
					$ionicLoading.hide();
					var alertPopup = $ionicPopup.alert({
						title : '提示',
						template : '' + data.message,
						buttons : [{
							text : '知道了'
						}]
					});
				};
			}).error(function(state) {
				$ionicLoading.hide();
				var alertPopup = $ionicPopup.alert({
					title : '提示',
					template : '网络异常',
					buttons : [{
						text : '知道了'
					}]
				});
			});
		};
	};
	// 获取流水号
	$scope.getSerialNumber = function(iMoney) {
		PayService.getSerialNumber(UserService.getUserId())
		.success(function(data) {
			$ionicLoading.hide();
			if (data.code == 200) {
				$ionicLoading.show({
					template : '<ion-spinner icon="bubbles" class="spinner-balanced"></ion-spinner>',
					duration : 5000
				});
				var serialNumber = data.data[0].serialNumber;


				// 微信支付
				HXPay.payWeChat(
				  iMoney,
				  "充值"+$scope.data.money+"元",
				  "充值"+$scope.data.money+"元",
				  ""+serialNumber,  // 订单号
				  "notifyUrl:",
				  function(msg) {
				      //更改账户余额
				      $scope.setAccountMoney(serialNumber);
				  },
				  function(msg) {
				  // TODO failed
				  }
				);
			} else {
				$ionicLoading.hide();
				var alertPopup = $ionicPopup.alert({
					title : '提示',
					template : '' + data.message,
					buttons : [{
						text : '知道了'
					}]
				});
			}
		}).error(function(state) {
			$ionicLoading.hide();
			var alertPopup = $ionicPopup.alert({
				title : '提示',
				template : '网络异常',
				buttons : [{
					text : '知道了'
				}]
			});
		});
	};
	// 更改账户余额

	$scope.setAccountMoney = function(serialNumber) {
		OrderService.payoff(serialNumber, UserService.getUserId(), $scope.orderNumber, $scope.data.money, $scope.description, $scope.payType, $scope.orderType)
		// PayService.setAccountMoney(UserService.getUserId(), serialNumber, $scope.data.money, $scope.payType)
		.success(function(data) {
			$ionicLoading.hide();
			if (data.code == 200) {
				$ionicLoading.show({
					template : '<ion-spinner icon="bubbles" class="spinner-balanced"></ion-spinner>',
					duration : 5000
				});
				//更改账户入出账履历
				$scope.setAccountComplete(serialNumber);
			} else {
				$ionicLoading.hide();
				var alertPopup = $ionicPopup.alert({
					title : '提示',
					template : '' + data.message,
					buttons : [{
						text : '知道了'
					}]
				});
			}
		}).error(function(state) {
			$ionicLoading.hide();
			var alertPopup = $ionicPopup.alert({
				title : '提示',
				template : '网络异常',
				buttons : [{
					text : '知道了'
				}]
			});
		});
	};

	//更改账户入出账履历
	$scope.setAccountComplete = function(serialNumber) {
		PayService.setAccountComplete(UserService.getUserId(), serialNumber, $scope.orderType, $scope.payType)
		.success(function(data) {
			$ionicLoading.hide();
			if (data.code == 200) {
				var alertPopup = $ionicPopup.alert({
					title : '提示',
					template : '充值成功',
                    buttons: [{text: '知道了',onTap:function(e){
      					$state.go("myAccount");
                    }}]
				});
			} else {
				$ionicLoading.hide();
				var alertPopup = $ionicPopup.alert({
					title : '提示',
					template : '' + data.message,
					buttons : [{
						text : '知道了'
					}]
				});
			}
		}).error(function(state) {
			// TODO 结算失败
			var alertPopup = $ionicPopup.alert({
				title : '提示',
				template : '结算失败, 请联系客服进行退款申诉。( 错误码:' + state + ')\n' + '流水号:' + serialNumber,
				buttons : [{
					text : '知道了'
				}]
			});
		});
	};

	// SelectMoneyController END.

});
