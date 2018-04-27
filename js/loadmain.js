var WGmap3D;
var initparameter = {
	infoBox: false
}

var tooltip;
var handlerPoint;
var handlerPolygon;
var handlerDis;
var handlerArea;
var handlerHeight;

var leftClick_handler;
var photoSphereMakerCollection = [];
var sceneBubble;
//页面加载入口
function onload() {

	WGmap3D = new Orange.WGmap3D('cesiumContainer', initparameter);
	$('#loadingbar').hide();
	if(!WGmap3D.scene.pickPositionSupported) {
		alert('不支持深度拾取,量算功能无法使用(无法进行鼠标交互绘制)！');
	}
	var infoboxContainer = document.getElementById("bubble");
	WGmap3D.viewer.customInfobox = infoboxContainer;

	var loginName = getlogin();

	$("#userLoginName", parent.document).text(loginName)

	//http://localhost:8090/iserver/services/3D-GAscene/rest/realspace
	//http://support.supermap.com.cn:8090/iserver/services/3D-CBD/rest/realspace
	var promise = WGmap3D.scene.openScene(dataConfig.sceneUrl);
	promise.then(function(layers) {
		WGmap3D.viewer.zoomTo(layers[0])
		var cameraobj = {
			heading: 0.4524677227269258,
			pitch: -0.3371180128131013,
			roll: 6.283185307121734,
			x: -2623878.6953883013,
			y: 4960995.063877211,
			z: 3033243.3860652596
		}
		WGmap3D.scene.setViewCameraObj(cameraobj)

		WGmap3D.scene.layer3Ds.buildLayersTree("treeContiner", WGmap3D);
		var layersTreeData = WGmap3D.scene.layer3Ds.getLayersTreeData();
		var s3mlayersName = [];
		layersTreeData[0].nodes.forEach(node => {
			s3mlayersName.push(node.text);
		})
		addlayerSelect('layerSelect', s3mlayersName);
		//添加街景maker
		addphotoSphereMaker();
	})
	//初始化气泡
	sceneBubble = new Bubble(WGmap3D.scene);

	leftClick_handler = new Cesium.ScreenSpaceEventHandler(WGmap3D.scene.canvas);
	//	photoSphereClick_handler=new Cesium.ScreenSpaceEventHandler(WGmap3D.scene.canvas);
	//	AddMaker_handler = new Cesium.ScreenSpaceEventHandler(WGmap3D.scene.canvas);
	//	queryattributes_handler = new Cesium.ScreenSpaceEventHandler(WGmap3D.scene.canvas);

	tooltip = createTooltip(document.body);

	handlerPoint = new Cesium.DrawHandler(WGmap3D.viewer, Cesium.DrawMode.Point);
	handlerPoint.activeEvt.addEventListener(function(isActive) {
		if(isActive == true) {
			WGmap3D.viewer.enableCursorStyle = false;
			WGmap3D.viewer._element.style.cursor = '';
			$('body').removeClass('drawCur').addClass('drawCur');
		} else {
			WGmap3D.viewer.enableCursorStyle = true;
			$('body').removeClass('drawCur');
		}
	});
	handlerPoint.movingEvt.addEventListener(function(windowPosition) {
		tooltip.showAt(windowPosition, '点击绘制一个点');
	});
	handlerPoint.drawEvt.addEventListener(function(result) {
		tooltip.setVisible(false);
		//console.log(result)

		var cartographic = Cesium.Cartographic.fromCartesian(result.object.position);
		//console.log(cartographic)
		var longitude = Cesium.Math.toDegrees(cartographic.longitude);
		var latitude = Cesium.Math.toDegrees(cartographic.latitude);
		var height = cartographic.height;
		if(height < 0) {
			height = 0;
		}
		var centerPoint = {
			x: longitude,
			y: latitude,
			z: height
		}
		//console.log(centerPoint)
		var R = $('#circleR').val();
		var backPoint = calculateCircle(centerPoint, R);
		addPolygon(backPoint.point3Ds);
		//var geocircle = new SuperMap.Geometry.Polygon([new SuperMap.Geometry.LinearRing(backPoint.point2Ds)]);
		queryByPolygon(backPoint.point2Ds, '建筑');
	});
	handlerPolygon = new Cesium.DrawHandler(WGmap3D.viewer, Cesium.DrawMode.Polygon);

	handlerPolygon.activeEvt.addEventListener(function(isActive) {
		if(isActive == true) {
			WGmap3D.viewer.enableCursorStyle = false;
			WGmap3D.viewer._element.style.cursor = '';
			$('body').removeClass('drawCur').addClass('drawCur');
		} else {
			WGmap3D.viewer.enableCursorStyle = true;
			$('body').removeClass('drawCur');
		}
	});
	handlerPolygon.movingEvt.addEventListener(function(windowPosition) {
		if(windowPosition.x < 210 && windowPosition.y < 120) {
			tooltip.setVisible(false);
			return;
		}
		if(handlerPolygon.isDrawing) {
			tooltip.showAt(windowPosition, '点击确定查询区域中间点,右键单击结束绘制');
		} else {
			tooltip.showAt(windowPosition, '点击绘制查询区域第一个点');
		}
	});
	handlerPolygon.drawEvt.addEventListener(function(result) {
		tooltip.setVisible(false);
		handlerPolygon.polygon.show = true;
		handlerPolygon.polyline.show = true;
		var geometry = CesiumToSuperMap.convertPolygon(Cesium, SuperMap, result.object);
		var geopint2Ds = geometry.components[0].components;
		var point2Ds = []
		for(var i = 0, len = geopint2Ds.length; i < len; i++) {
			point2Ds.push({
				"x": geopint2Ds[i].x,
				"y": geopint2Ds[i].y
			})
		}

		var fieldName = $('#layerSelect').selectpicker('val');
		if(fieldName !== '') {
			queryByPolygon(point2Ds, fieldName.split('@')[0]);
		}

	});

	/*量算*/
	//初始化测量距离
	handlerDis = new Cesium.MeasureHandler(WGmap3D.viewer, Cesium.MeasureMode.Distance, 0);
	//注册测距功能事件
	handlerDis.measureEvt.addEventListener(function(result) {
		var distance = parseFloat(result.distance) > 1000 ? (parseFloat(result.distance) / 1000).toFixed(2) + 'km' : parseFloat(result.distance).toFixed(2) + 'm';
		handlerDis.disLabel.text = '距离:' + distance;

	});
	handlerDis.activeEvt.addEventListener(function(isActive) {
		if(isActive == true) {
			WGmap3D.viewer.enableCursorStyle = false;
			WGmap3D.viewer._element.style.cursor = '';
			$('body').removeClass('measureCur').addClass('measureCur');
		} else {
			WGmap3D.viewer.enableCursorStyle = true;
			$('body').removeClass('measureCur');
		}
	});

	//初始化测量面积
	handlerArea = new Cesium.MeasureHandler(WGmap3D.viewer, Cesium.MeasureMode.Area, 0);
	handlerArea.measureEvt.addEventListener(function(result) {
		var area = parseFloat(result.area) > 1000000 ? (parseFloat(result.area) / 1000000).toFixed(2) + 'km²' : parseFloat(result.area).toFixed(2) + '㎡'
		handlerArea.areaLabel.text = '面积:' + area;
	});
	handlerArea.activeEvt.addEventListener(function(isActive) {
		if(isActive == true) {
			WGmap3D.viewer.enableCursorStyle = false;
			WGmap3D.viewer._element.style.cursor = '';
			$('body').removeClass('measureCur').addClass('measureCur');
		} else {
			WGmap3D.viewer.enableCursorStyle = true;
			$('body').removeClass('measureCur');
		}
	});
	//初始化测量高度
	handlerHeight = new Cesium.MeasureHandler(WGmap3D.viewer, Cesium.MeasureMode.DVH);
	handlerHeight.measureEvt.addEventListener(function(result) {
		var distance = parseFloat(result.distance) > 1000 ? (parseFloat(result.distance) / 1000).toFixed(2) + 'km' : parseFloat(result.distance) + 'm';
		var vHeight = parseFloat(result.verticalHeight) > 1000 ? (parseFloat(result.verticalHeight) / 1000).toFixed(2) + 'km' : parseFloat(result.verticalHeight) + 'm';
		var hDistance = parseFloat(result.horizontalDistance) > 1000 ? (parseFloat(result.horizontalDistance) / 1000).toFixed(2) + 'km' : parseFloat(result.horizontalDistance) + 'm';
		handlerHeight.disLabel.text = '空间距离:' + distance;
		handlerHeight.vLabel.text = '垂直高度:' + vHeight;
		handlerHeight.hLabel.text = '水平距离:' + hDistance;
	});
	handlerHeight.activeEvt.addEventListener(function(isActive) {
		if(isActive == true) {
			WGmap3D.viewer.enableCursorStyle = false;
			WGmap3D.viewer._element.style.cursor = '';
			$('body').removeClass('measureCur').addClass('measureCur');
		} else {
			WGmap3D.viewer.enableCursorStyle = true;
			$('body').removeClass('measureCur');
		}
	});

}
//登录跳转参数接收
var getlogin = function() {
	var url = window.parent.location.search; //获取url中"?"符后的字串 ('?modFlag=business&role=1')  
	//console.log(url)
	if(url.indexOf("?") != -1) {
		var str = url.substr(1); //substr()方法返回从参数值开始到结束的字符串；  
		var strs = str.split("?");

		var strName = strs[0];
		var result = CryptoJS.AES.decrypt(strName, keyWord).toString(CryptoJS.enc.Utf8);
		return result;

		//		switch(result) {
		//			case 'admin':
		//				console.log(result);
		//				break;
		//			case 'admin_ZTS':
		//				console.log(result);
		//				break;
		//			case 'admin_JY':
		//				console.log(result);
		//				break;
		//
		//		}
	}
}
$('#MeasureDis').click(function() {
	//clearAll();
	deactiveAll();
	handlerDis && handlerDis.activate();
});

$('#MeasureArea').click(function() {
	//clearAll();
	deactiveAll();
	handlerArea && handlerArea.activate();
});
$('#MeasureHeigh').click(function() {
	//clearAll();
	deactiveAll();
	handlerHeight && handlerHeight.activate();
});
$('#Clear').click(function() {
	clearAll();
});

function clearAll() {
	if(window.queryPolygon !== undefined) {
		WGmap3D.viewer.entities.remove(window.queryPolygon);
	}
	if(window.LocationEntity !== undefined) {
		WGmap3D.viewer.entities.remove(window.LocationEntity);
	}
	handlerPolygon.clear();
	handlerPoint.clear();
	handlerDis && handlerDis.clear();
	handlerArea && handlerArea.clear();
	handlerHeight && handlerHeight.clear();
	if(tooltip !== undefined) {
		tooltip.setVisible(false);
	}
	if(window.StartmakerEntity !== undefined && window.StartmakerEntity !== '') {
		WGmap3D.viewer.entities.remove(window.StartmakerEntity);
		window.StartmakerEntity = '';
	}
	if(window.EndmakerEntity !== undefined && window.EndmakerEntity !== '') {
		WGmap3D.viewer.entities.remove(window.EndmakerEntity);
		window.EndmakerEntity = '';
	}
	if(window.networkResultLine !== undefined && window.networkResultLine !== '') {
		WGmap3D.viewer.entities.remove(window.networkResultLine);
		window.networkResultLine = '';
	}

}

function deactiveAll() {

	addMaker(false);
	queryattributesClick(false);
	photoSphereMakerSelect(false);

	handlerPoint && handlerPoint.deactivate();
	handlerPolygon && handlerPolygon.deactivate();
	handlerDis && handlerDis.deactivate();
	handlerArea && handlerArea.deactivate();
	handlerHeight && handlerHeight.deactivate();
}
/*量算结束*/

$("#drawCenterPoint").click(function() {
	clearAll();

	deactiveAll();
	handlerPoint.activate();
	closePanel('#queryByCircle');
})
$("#drawPolygon").click(function() {
	clearAll();

	deactiveAll();
	handlerPolygon.activate();
	closePanel('#queryByPolygon');
})
//飞行选择
$('#startFly').click(function() {
	sceneFlyClick();
})
//
$("#addMakerBtn").click(function() {
	$("#MakerInfo").prop("onclick", null).off("click");
})
$("#queryBysqlLikeBtn").click(function() {
	clearAll();

	deactiveAll();
	addMaker(false);
	getFeatureBysqlLike();
	closePanel('#queryBysql');
})
//关闭drapdown面板
function closePanel(a) {
	//var $this = $(a);
	var $parent = $(a);

	$parent.removeClass('open').trigger($.Event('hidden.bs.dropdown'))
}
//关闭查询结果面板
function closeResultPanel(a) {
	$(a).hide();
}
/*空间查询图层select列表写入，当前只指定s3m图层*/
//传入select的id和需要写入的值数组
var addlayerSelect = function(a, b) {
	if(a && b) {
		var innerHtmlStr = "";
		for(var i = 0, len = b.length; i < len; i++) {
			innerHtmlStr += "<option>" + b[i] + "</option>"
		}
		$("#" + a).html(innerHtmlStr);
		$("#" + a).selectpicker('refresh');

	}
}
var updataqueryInfoPanel = function(a, b) {
	if(a.length > 0) {
		var updatainnerHtml = "";
		for(var i = 0, len = a.length; i < len; i++) {
			updatainnerHtml += '<a href="#" class="list-group-item"><span class="glyphicon glyphicon-map-marker" aria-hidden="true"></span>' + a[i].fieldValues[a[i].fieldNames.indexOf(b)] + '</a>'
		}

		$("#queryResultslist").html(updatainnerHtml);
		$('#queryResults').show();

		$('.list-group-item').click(function() {
			var listValue = $(this).text();
			var selectFeature = findResultFeature(listValue);
			console.log(selectFeature);
			if(selectFeature !== undefined) {
				var xmin = selectFeature.fieldValues[selectFeature.fieldNames.indexOf("SMSDRIW")];
				var ymin = selectFeature.fieldValues[selectFeature.fieldNames.indexOf("SMSDRIS")];
				var xmax = selectFeature.fieldValues[selectFeature.fieldNames.indexOf("SMSDRIE")];
				var ymax = selectFeature.fieldValues[selectFeature.fieldNames.indexOf("SMSDRIN")];
				var bottom = selectFeature.fieldValues[selectFeature.fieldNames.indexOf("BOTTOMATTITUDE")];
				var h = selectFeature.fieldValues[selectFeature.fieldNames.indexOf("HEIGHT")];
				if(window.LocationEntity !== undefined) {
					WGmap3D.viewer.entities.remove(window.LocationEntity);
				}
				var LocationEntity = WGmap3D.viewer.entities.add({
					name: 'LocationEntity',
					rectangle: {
						coordinates: Cesium.Rectangle.fromDegrees(parseFloat(xmin), parseFloat(ymin), parseFloat(xmax), parseFloat(ymax)),
						material: Cesium.Color.BLUE.withAlpha(0.5),
						extrudedHeight: parseFloat(bottom) + parseFloat(h) + 20,
						height: parseFloat(bottom) + 20,
						outline: true,
						outlineColor: Cesium.Color.BLACK
					}
				})
				window.LocationEntity = LocationEntity;
				WGmap3D.viewer.flyTo(LocationEntity, {
					duration: 2
				})
			}

		})
	}
}
//根据查询结果列表值查找结果中的对象
var findResultFeature = function(listValue) {
	for(var i = 0, len = window.ResultFeatures.length; i < len; i++) {
		if(window.ResultFeatures[i].fieldValues.indexOf(listValue) > 0) {
			return window.ResultFeatures[i];
		}
	}
}
//添加兴趣点标注
var addMaker = function(value) {
	//clearAll();

	var inputfn = leftClick_handler.getInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK);
	if(inputfn !== undefined) {
		leftClick_handler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK);
	}
	if(value === true) {
		WGmap3D.viewer.enableCursorStyle = false;
		WGmap3D.viewer._element.style.cursor = '';
		$('body').removeClass('drawCur').addClass('drawCur');

		leftClick_handler.setInputAction(function(e) {
			var position = WGmap3D.scene.pickPosition(e.position);

			//将笛卡尔坐标转化为经纬度坐标
			var cartographic = Cesium.Cartographic.fromCartesian(position);
			var longitude = Cesium.Math.toDegrees(cartographic.longitude);
			var latitude = Cesium.Math.toDegrees(cartographic.latitude);
			var height = cartographic.height;

			var makerEntity = WGmap3D.viewer.entities.add({
				position: position,
				billboard: {
					image: './images/location4.png', // default: undefined
					pixelOffset: new Cesium.Cartesian2(0, -30),
					scale: 0.5
				},
				label: {
					text: '标注',
					font: '24px sans-serif',
					horizontalOrigin: 1,
					outlineColor: new Cesium.Color(0, 0, 0, 1),
					outlineWidth: 2,
					pixelOffset: new Cesium.Cartesian2(30, -30),
					style: Cesium.LabelStyle.FILL
				}
			});
			window.makerEntity = makerEntity;
			$('#MakerInfo').modal('show')

		}, Cesium.ScreenSpaceEventType.LEFT_CLICK);

	} else {
		WGmap3D.viewer.enableCursorStyle = true;
		$('body').removeClass('drawCur');
		var inputfn = leftClick_handler.getInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK)
		if(inputfn !== undefined) {
			leftClick_handler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK);
		}

	}

}
//查询属性操作
var queryattributesClick = function(value) {
	//clearAll();

	var inputfn = leftClick_handler.getInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK)
	if(inputfn !== undefined) {
		leftClick_handler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK);
	}
	if(value === true) {
		addMaker(false);
		photoSphereMakerSelect(false);
		WGmap3D.viewer.enableCursorStyle = false;
		WGmap3D.viewer._element.style.cursor = '';
		$('body').removeClass('queryattributesCur').addClass('queryattributesCur');
		leftClick_handler.setInputAction(function(e) {

			var position = WGmap3D.scene.pickPosition(e.position);

			var selection3D = WGmap3D.viewer.getSelection();
			if(selection3D !== undefined) {
				getFeatureBysql(selection3D, position)

			} else {
				sceneBubble.container.hide();
			}

		}, Cesium.ScreenSpaceEventType.LEFT_CLICK);

	} else {
		sceneBubble.container.hide();
		WGmap3D.viewer.enableCursorStyle = true;
		$('body').removeClass('queryattributesCur');
		var inputfn = leftClick_handler.getInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK);
		if(inputfn !== undefined) {
			leftClick_handler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK);
		}

	}

}

$("#SureaddMaker").click(function() {
	if(window.makerEntity !== undefined) {
		window.makerEntity.label.text = $("#MakerName").val();
		$("#MakerName").val("");
		$("#MakerInfo").val();
		$("#MakerInfo").val("");
		$('#MakerInfo').modal('hide');
		addMaker(false);

	}

})
$("#CanceladdMaker").click(function() {
	if(window.makerEntity !== undefined) {
		WGmap3D.viewer.entities.remove(window.makerEntity)
		addMaker(false);
	}

})

var calculateCircle = function(point, R) {

	var returnObj = {
		point3Ds: [],
		point2Ds: []
	}
	for(var i = 0; i < 100; i++) {
		var lonlat = SuperMap.Util.destinationVincenty(new SuperMap.LonLat(point.x, point.y), 360 / 100 * i, R);

		returnObj.point3Ds.push(lonlat.lon);
		returnObj.point3Ds.push(lonlat.lat);

		returnObj.point3Ds.push(point.z);
		returnObj.point2Ds.push({
			"x": lonlat.lon,
			"y": lonlat.lat
		})
		//returnObj.point2Ds.push(new SuperMap.Geometry.Point(lonlat.lon, lonlat.lat));

	}

	return returnObj;
}
var addPolygon = function(point3Ds) {
	window.queryPolygon = WGmap3D.viewer.entities.add({
		name: 'Green extruded polygon',
		polygon: {
			hierarchy: Cesium.Cartesian3.fromDegreesArrayHeights(point3Ds),
			extrudedHeight: point3Ds[2] + 20,
			outline: true,
			outlineColor: Cesium.Color.WHITE,
			material: Cesium.Color.WHITE.withAlpha(0.5)
		}
	});

}

//空间查询
function queryByPolygon(a, b) { //a查询面，b查询数据集名
	var queryObj = {
		"getFeatureMode": "SPATIAL",
		"spatialQueryMode": "INTERSECT",
		"datasetNames": [dataConfig.dataServers.dataSourceName + ":" + b],
		"geometry": {
			id: 0,
			parts: [1],
			points: a,
			type: "REGION"
		}
	};

	var queryObjJson = JSON.stringify(queryObj);
	var dataUrl = dataConfig.dataServers.url;

	$.ajax({
		type: "post",
		url: dataUrl,
		data: queryObjJson,
		success: function(result) {
			var resultobj = JSON.parse(result);

			window.ResultFeatures = resultobj.features;

			updataqueryInfoPanel(resultobj.features, "MODELNAME");

		},
		error: function(msg) {
			console.log(msg);
		}
	})
}

//sql模糊查询
function getFeatureBysqlLike() {

	var fieldName = $('#fieldSelect').selectpicker('val');
	var QueryFilter = $('#QueryFilter').val();
	if(fieldName != "" && QueryFilter != "") {
		var queryObj = {
			"getFeatureMode": "SQL",
			"datasetNames": [dataConfig.dataServers.dataSourceName + ":建筑"],
			"queryParameter": {

				attributeFilter: fieldName + " like " + "'%" + QueryFilter + "%'"
			}
		};

		var queryObjJson = JSON.stringify(queryObj);
		var dataUrl = dataConfig.dataServers.url;

		$.ajax({
			type: "post",
			url: dataUrl,
			data: queryObjJson,
			success: function(result) {
				var resultobj = JSON.parse(result);

				window.ResultFeatures = resultobj.features;

				updataqueryInfoPanel(resultobj.features, fieldName);

			},
			error: function(msg) {
				console.log(msg);
			}
		})
	}

}

//点击sql查询
function getFeatureBysql(selection, position) {
	//暂时只指定固定的一个数据，后期根据数据进行判断
	var dataSetName = selection.layer.Caption

	var queryObj = {
		"getFeatureMode": "ID",
		"datasetNames": [dataConfig.dataServers.dataSourceName + ":" + dataSetName],
		"ids": [selection.ID]
	};

	var queryObjJson = JSON.stringify(queryObj);
	var dataUrl = dataConfig.dataServers.url;

	$.ajax({
		type: "post",
		url: dataUrl,
		data: queryObjJson,
		success: function(result) {
			var resultobj = JSON.parse(result);

			var backfeature = resultobj.features[0];

			sceneBubble.showAt(position);
			sceneBubble.container.change({
				contentTable: {
					name: backfeature.fieldNames,
					value: backfeature.fieldValues
				}
			})
			sceneBubble.selection3D = selection;

		},
		error: function(msg) {
			console.log(msg);
		}
	})

}

//飞行路线选择，开始飞行
var sceneFlyClick = function() {
	if(WGmap3D.flyManager !== undefined) {
		WGmap3D.flyManager.stop();
		WGmap3D.flyManager = null;
		WGmap3D.flyRoutes = null;

	}
	WGmap3D.flyRoutes = new Cesium.RouteCollection();
	WGmap3D.flyManager = new Cesium.FlyManager({
		scene: WGmap3D.scene,
		routes: WGmap3D.flyRoutes
	});
	var fpfFileName = $('#flyRouteSelect').selectpicker('val');
	if(fpfFileName !== '') {
		var fpfFileurl = './data/flyRoutes/' + fpfFileName + '.fpf'
		WGmap3D.flyRoutes.fromFile(fpfFileurl)
	}
	Cesium.when(WGmap3D.flyRoutes.readyPromise, function() {
		Cesium.when(WGmap3D.flyManager.readyPromise, function() {
			WGmap3D.flyManager.playRate = 10;
			WGmap3D.flyManager.play();
		})
	})

	//	$('#pauseFly').click(function() {
	//		if(WGmap3D.flyManager !== undefined && WGmap3D.flyManager !== null) {
	//			WGmap3D.flyManager.pause();
	//		}
	//	})
	$('#stopFly').click(function() {
		if(WGmap3D.flyManager !== undefined && WGmap3D.flyManager !== null) {
			WGmap3D.flyManager.stop();

		}
	})

}

//添加街景Maker
var addphotoSphereMaker = function() {
	for(var i = 0, len = photoSpherePoints.length; i < len; i++) {
		var photoSpherePoint = photoSpherePoints[i];

		var photoSpheremakerEntity = WGmap3D.viewer.entities.add({
			position: Cesium.Cartesian3.fromDegrees(photoSpherePoint.position.x, photoSpherePoint.position.y, photoSpherePoint.position.z),
			billboard: {
				image: './images/sxtimg.png',
				pixelOffset: new Cesium.Cartesian2(0, -30),
				scale: 0.2
			},
			label: {
				text: photoSpherePoint.name,
				font: '24px sans-serif',
				horizontalOrigin: 1,
				outlineColor: new Cesium.Color(0, 0, 0, 1),
				outlineWidth: 2,
				pixelOffset: new Cesium.Cartesian2(30, -30),
				style: Cesium.LabelStyle.FILL
			},
			show: false,
			description: photoSpherePoint.photoSphereUrl + '?' + photoSpherePoint.description
		});
		photoSphereMakerCollection.push(photoSpheremakerEntity);

	}
}

//切换到街景，显示街景图标
var photoSphereBtn_Click = function() {
	photoSphereMakerCollection.forEach(Entity => {
		Entity.show === false ? (
			Entity.show = true,
			photoSphereMakerSelect(true)
		) : (
			Entity.show = false,
			photoSphereMakerSelect(false)
		);

	})
}

//街景Maker点击弹出对应全景图片
var photoSphereMakerSelect = function(value) {
	//clearAll();

	var inputfn = leftClick_handler.getInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK)
	if(inputfn !== undefined) {
		leftClick_handler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK);
	}
	if(value === true) {
		addMaker(false);
		WGmap3D.viewer.enableCursorStyle = false;
		WGmap3D.viewer._element.style.cursor = '';
		$('body').removeClass('photosphereCur').addClass('photosphereCur');
		leftClick_handler.setInputAction(function(e) {
			var selectedEntity = WGmap3D.viewer.selectedEntity;
			if(selectedEntity != undefined) {
				var Entiytype = selectedEntity.description._value.split('?')[1];
				var photoSphereimageUrl = selectedEntity.description._value.split('?')[0];
				if(Entiytype === 'photoSphere') {
					if(Window.lastSelectedEntiy !== undefined) {
						Window.lastSelectedEntiy.billboard.color = undefined;
					}
					selectedEntity.billboard.color = Cesium.Color.AQUA.withAlpha(0.8);
					Window.lastSelectedEntiy = selectedEntity;

					intphotoSphere(photoSphereimageUrl);

				}
			} else {
				if(Window.lastSelectedEntiy !== undefined) {
					Window.lastSelectedEntiy.billboard.color = undefined;
					Window.lastSelectedEntiy = undefined;
				}
			}

		}, Cesium.ScreenSpaceEventType.LEFT_CLICK);

	} else {

		WGmap3D.viewer.enableCursorStyle = true;
		$('body').removeClass('photosphereCur');
		var inputfn = leftClick_handler.getInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK);
		if(inputfn !== undefined) {
			leftClick_handler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK);
		}
		if(Window.lastSelectedEntiy !== undefined) {
			Window.lastSelectedEntiy.billboard.color = undefined;
			Window.lastSelectedEntiy = undefined;
		}

	}
}
//街景初始化
var intphotoSphere = function(imgeUrl) {
	$('#photospherePanel').show();
	var div = document.getElementById('photosphereContainer');
	var PSV = new PhotoSphereViewer({

		// Panorama, given in base 64
		panorama: imgeUrl,

		// Container
		container: div,

		// Deactivate the animation
		time_anim: false,

		// Display the navigation bar
		navbar: true,

	});

}
/*******路网分析开始*******/
$('#drawStartMaker').click(function() {
	addnetworkAnalysisMaker('start')
})
$('#drawEndMaker').click(function() {
	addnetworkAnalysisMaker('end')
})
$('#networkAnalysisClick').click(function() {
	startnetworkAnalysis();
})

//网络分析绘制起始点和终止点
var addnetworkAnalysisMaker = function(type) {

	deactiveAll();
	var inputfn = leftClick_handler.getInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK)
	if(inputfn !== undefined) {
		leftClick_handler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK);
	}

	if(type === 'start') {
		if(window.StartmakerEntity !== undefined && window.StartmakerEntity !== '') {
			WGmap3D.viewer.entities.remove(window.StartmakerEntity);
			window.StartmakerEntity = '';
		}
		if(window.networkResultLine !== undefined && window.networkResultLine !== '') {
			WGmap3D.viewer.entities.remove(window.networkResultLine);
			window.networkResultLine = '';
		}
		WGmap3D.viewer.enableCursorStyle = false;
		WGmap3D.viewer._element.style.cursor = '';
		$('body').removeClass('drawCur').addClass('drawCur');
		leftClick_handler.setInputAction(function(e) {

			var position = WGmap3D.scene.pickPosition(e.position);

			//将笛卡尔坐标转化为经纬度坐标
			var cartographic = Cesium.Cartographic.fromCartesian(position);
			var longitude = Cesium.Math.toDegrees(cartographic.longitude);
			var latitude = Cesium.Math.toDegrees(cartographic.latitude);
			var height = cartographic.height;

			//text赋值
			$('#startPointx').attr("value", longitude);
			$('#startPointy').attr("value", latitude);

			var StartmakerEntity = WGmap3D.viewer.entities.add({
				position: position,
				billboard: {
					image: './images/startMaker.png', // default: undefined
					pixelOffset: new Cesium.Cartesian2(0, -30),
					scale: 0.25
				}
			});
			window.StartmakerEntity = StartmakerEntity;
			leftClick_handler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK);
			$('body').removeClass('drawCur');
			deactiveAll();

		}, Cesium.ScreenSpaceEventType.LEFT_CLICK);

	} else if(type === 'end') {
		if(window.EndmakerEntity !== undefined && window.EndmakerEntity !== '') {
			WGmap3D.viewer.entities.remove(window.EndmakerEntity);
			window.EndmakerEntity = '';
		}
		if(window.networkResultLine !== undefined && window.networkResultLine !== '') {
			WGmap3D.viewer.entities.remove(window.networkResultLine);
			window.networkResultLine = '';
		}
		WGmap3D.viewer.enableCursorStyle = false;
		WGmap3D.viewer._element.style.cursor = '';
		$('body').removeClass('drawCur').addClass('drawCur');
		leftClick_handler.setInputAction(function(e) {

			var position = WGmap3D.scene.pickPosition(e.position);

			//将笛卡尔坐标转化为经纬度坐标
			var cartographic = Cesium.Cartographic.fromCartesian(position);
			var longitude = Cesium.Math.toDegrees(cartographic.longitude);
			var latitude = Cesium.Math.toDegrees(cartographic.latitude);
			var height = cartographic.height;

			//text赋值
			$('#endPointx').attr("value", longitude);
			$('#endPointy').attr("value", latitude);

			var EndmakerEntity = WGmap3D.viewer.entities.add({
				position: position,
				billboard: {
					image: './images/endMaker.png', // default: undefined
					pixelOffset: new Cesium.Cartesian2(0, -30),
					scale: 0.25
				}
			});
			window.EndmakerEntity = EndmakerEntity;
			leftClick_handler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK);
			$('body').removeClass('drawCur')
			deactiveAll();

		}, Cesium.ScreenSpaceEventType.LEFT_CLICK);

	}
}
//确认执行路网分析
var startnetworkAnalysis = function() {

	if(window.networkResultLine !== undefined && window.networkResultLine !== '') {
		WGmap3D.viewer.entities.remove(window.networkResultLine);
		window.networkResultLine = '';
	}
	var pointz = 22;
	var startPointx = $('#startPointx').val();
	var startPointy = $('#startPointy').val();

	var endPointx = $('#endPointx').val();
	var endPointy = $('#endPointy').val();
	if(startPointx && startPointy && endPointx && endPointy) {
		var url = 'http://localhost:8090/iserver/services/PathAnalysisExtension/rest/domainComponents/PathAnalysisExtension/pathAnalysisResult.json';
		var dataurl = 'arg0=' + startPointx + '&arg1=' + startPointy + '&arg2=' + endPointx + '&arg3=' + endPointy;
		var queryurl = url + '?' + dataurl;

		$.ajax({
			type: "get",
			url: queryurl,
			success: function(result) {
				//var resultobj = JSON.parse(result);
				//console.log(result);
				var resultpoints = result.coordinates;
				if(resultpoints) {
					var Linepoint3Ds = [parseFloat(startPointx), parseFloat(startPointy), pointz];
					for(var i = 0, len = resultpoints.length; i < len; i++) {
						Linepoint3Ds.push(resultpoints[i][0]);
						Linepoint3Ds.push(resultpoints[i][1]);
						Linepoint3Ds.push(pointz);
					}
					Linepoint3Ds.push(parseFloat(endPointx));
					Linepoint3Ds.push(parseFloat(endPointy));
					Linepoint3Ds.push(pointz);

					var networkResultLine = WGmap3D.viewer.entities.add({
						name: '路网分析结果',
						polyline: {
							positions: Cesium.Cartesian3.fromDegreesArrayHeights(Linepoint3Ds),
							width: 6,
							material: new Cesium.PolylineDashMaterialProperty({
								color: Cesium.Color.CYAN
							})
						}
					});
					window.networkResultLine = networkResultLine;

				}

			},
			error: function(msg) {
				console.log(msg);
			}
		})

	}

}