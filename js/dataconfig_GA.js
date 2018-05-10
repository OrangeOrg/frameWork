var dataConfig = {
	sceneUrl: 'http://localhost:8090/iserver/services/3D-GAscene/rest/realspace',
	cameraobj:{
			heading: 0.4524677227269258,
			pitch: -0.3371180128131013,
			roll: 6.283185307121734,
			x: -2623878.6953883013,
			y: 4960995.063877211,
			z: 3033243.3860652596
	},
	dataServers: {
		//http://www.supermapol.com/realspace/services/data-cbd/rest/data/featureResults.rjson?returnContent=true
		url: 'http://localhost:8090/iserver/services/data-GAscene/rest/data/featureResults.rjson?returnContent=true',
		dataSourceName: 'dataRe',
		dataSets: {
			树木: '树木',
			路灯: '路灯',
			水面: '水面',
			道路: '道路',
			信号灯: '信号灯',
			建筑: '建筑'

		}
	},
	PathAnalysisurl:'http://localhost:8090/iserver/services/PathAnalysisExtension/rest/domainComponents/PathAnalysisExtension/pathAnalysisResult.json'
}