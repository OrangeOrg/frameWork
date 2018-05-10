var dataConfig = {
	sceneUrl: 'http://localhost:8090/iserver/services/3D-lx/rest/realspace',
	//sceneUrl:'http://localhost:8090/iserver/services/3D-dataCD/rest/realspace',
	cameraobj: {
		heading: 0.4524677227269258,
		pitch: -0.3371180128131013,
		roll: 6.283185307121734,
		x: -2623878.6953883013,
		y: 4960995.063877211,
		z: 3033243.3860652596
	},
	dataServers: {
		//http://www.supermapol.com/realspace/services/data-cbd/rest/data/featureResults.rjson?returnContent=true
		baseMOdeldataServer:{
			url: 'http://localhost:8090/iserver/services/data-lx/rest/data/featureResults.rjson?returnContent=true',
		},
		
		TiltmodeldataServer:{//倾斜单体化图层参数配置，图层名唯一
			'dtm':{
				dataSourceName:'DTM',
				dataSetName:'dtm',
				url:'http://localhost:8090/iserver/services/data-dataCD/rest/data/featureResults.rjson?returnContent=true'
			}
		}

		
	},
	PathAnalysisurl: 'http://localhost:8090/iserver/services/PathAnalysisExtension/rest/domainComponents/PathAnalysisExtension/pathAnalysisResult.json'
}