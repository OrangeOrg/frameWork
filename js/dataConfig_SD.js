var dataConfig = {
	sceneUrl: 'http://localhost:8090/iserver/services/3D-ZhongTiaoShanSuiDao/rest/realspace',
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
		url: 'http://localhost:8090/iserver/services/data-ZhongTiaoShanSuiDao/rest/data/featureResults.rjson?returnContent=true',
		dataSourceName: '中条山隧道空间数据库(WGS84)',
		dataSets: {
			中条山隧道主洞右线模型_出口_1: '中条山隧道主洞右线模型_出口_1',
			中条山隧道主洞右线模型_洞身_1: '中条山隧道主洞右线模型_洞身_1',
			中条山隧道主洞右线模型_进口_1: '中条山隧道主洞右线模型_进口_1',
			中条山隧道主洞左线模型_出口_1: '中条山隧道主洞左线模型_出口_1',
			中条山隧道主洞左线模型_洞身_1: '中条山隧道主洞左线模型_洞身_1',
			中条山隧道主洞左线模型_进口_1: '中条山隧道主洞左线模型_进口_1'

		}
	},
	PathAnalysisurl: 'http://localhost:8090/iserver/services/PathAnalysisExtension/rest/domainComponents/PathAnalysisExtension/pathAnalysisResult.json'
}