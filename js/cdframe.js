var viewer;
var scene;

function onload(Cesium) {
	//初始化viewer部件
	viewer = new Cesium.Viewer('cesiumContainer', {
		//		sceneMode: Cesium.SceneMode.SCENE2D,
		infoBox: false,
		//		sceneModePicker:true,
		//		navigation:false
	});
	scene = viewer.scene;

	var imageryLayers = viewer.imageryLayers;
	var VECimageryProvider = new Cesium.TiandituImageryProvider({
		mapStyle: Cesium.TiandituMapsStyle.IMG_C,
		credit: new Cesium.Credit('天地图全球影像服务     数据来源：国家地理信息公共服务平台 & 四川省测绘地理信息局')
	})
	imageryLayers.addImageryProvider(VECimageryProvider);
	//初始化天地图全球中文注记服务，并添加至影像图层
	var labelImagery = new Cesium.TiandituImageryProvider({
		mapStyle: Cesium.TiandituMapsStyle.CIA_C //天地图全球中文注记服务（经纬度投影）
	});

	imageryLayers.addImageryProvider(labelImagery);
	addboundaries();
	buildTree('layerTree', treedata);
	$('#loadingbar').remove();
	var SCentity = viewer.entities.getById('四川省');
	if(SCentity !== undefined) {
		SCentity.show = true;
		viewer.flyTo(SCentity, {
			duration: 2
		})
		setTimeout(function() {
			//viewer.sceneMode=Cesium.SceneMode.SCENE3D
		}, 2000)
	}

}

//添加行政边界界线
var addboundaries = function() {
	dataBounds.forEach(function(bound) {
		viewer.entities.add({
			id: bound.name,
			name: bound.name,
			polygon: {
				hierarchy: Cesium.Cartesian3.fromDegreesArray(bound.points),
				extrudedHeight: 10000.0,
				material: Cesium.Color.CYAN.withAlpha(0.5),
				outline: true,
				outlineColor: Cesium.Color.NAVY,
				closeBottom:false
			},
			show: false
		});
	})
}
//添加树状结构
var buildTree = function(a, b) { //a传入containerDOMID，基于bootstrap创建,b为nodedata
	var nameStr = "#" + a;
	$(nameStr).empty();
	var layetreediv = $('<div></div>'); //创建一个子div
	layetreediv.attr('id', 'layerTree'); //给子div设置id
	layetreediv.addClass('treeview'); //添加css样式

	$(nameStr).append(layetreediv);

	if(b) {
		$('#layerTree').treeview({
			data: b,
			checkedIcon: "glyphicon glyphicon-check",
			backColor: "#071D32",
			color: "#fff",
			selectedColor: "#21F2F3",

			onhoverColor: "#07A3EE",
			//showBorder:false,
			multiSelect: false,
			showCheckbox: false,

			onNodeSelected: function(event, node) //节点选中事件
			{
				var nodetext = node.text;
				var nodeEntity = viewer.entities.getById(nodetext);
				if(nodeEntity !== undefined) {
					viewer.entities.values.forEach(function(entity) {
						entity.show = false;

					})
					nodeEntity.show = true;
					viewer.flyTo(nodeEntity, {
						duration: 2
					})
					addeacharts(nodetext);
				}

			}

		});

	}

}
//弹出echarts
var addeacharts = function(a) {
	var dom = document.getElementById("echartsContainer");
	dom.style.display='block';
	echarts.dispose(dom);
	var myChart = echarts.init(dom);
	var app = {};
	option = null;
	option = {
		title: {
			text: a,
			//			subtext: '纯属虚构',
			x: 'center',
			textStyle:{
				color:'#fff'
			}
		},
		tooltip: {
			trigger: 'item',
			formatter: "{a} <br/>{b} : {c} ({d}%)"
		},
		backgroundColor:'rgba(7, 29, 50, 0.8)',
		//'#071D32',
		legend: {
			x: 'center',
			y: 'bottom',
			data: ['rose1', 'rose2', 'rose3', 'rose4', 'rose5', 'rose6', 'rose7', 'rose8']
		},
		toolbox: {
			show: true,
			feature: {
				mark: {
					show: true
				},
				dataView: {
					show: false,
					readOnly: false
				},
				magicType: {
					show: true,
					type: ['pie']
				},
				restore: {
					show: false
				},
				saveAsImage: {
					show: false
				}
			}
		},
		calculable: true,
		series: [{
			name: '面积模式',
			type: 'pie',
			radius: [30, 110],
			center: ['50%', '50%'],
			roseType: 'area',
			data: [{
					value: 10,
					name: 'rose1'
				},
				{
					value: 5,
					name: 'rose2'
				},
				{
					value: 15,
					name: 'rose3'
				},
				{
					value: 25,
					name: 'rose4'
				},
				{
					value: 20,
					name: 'rose5'
				},
				{
					value: 35,
					name: 'rose6'
				},
				{
					value: 30,
					name: 'rose7'
				},
				{
					value: 40,
					name: 'rose8'
				}
			]
		}]
	};
	if(option && typeof option === "object") {
		myChart.setOption(option, true);
	}
}