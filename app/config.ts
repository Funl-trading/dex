import { Arbitrum, Base, Ethereum, Optimism } from '@orderly.network/types';
import injectedModule from '@web3-onboard/injected-wallets';
import ledgerModule from '@web3-onboard/ledger';
import coinbaseModule from '@web3-onboard/coinbase';
// import trezorModule from '@web3-onboard/trezor'
import walletConnectModule from '@web3-onboard/walletconnect';

export function OrderlyConfig(ctx?: { url: string; domain: string }) {
	const wcV2InitOptions = {
		version: 2,
		projectId: '93dba83e8d9915dc6a65ffd3ecfd19fd',
		requiredChains: [8453],
		optionalChains: [8453],
		dappUrl: window.location.host,
	};

	const ledgerInitOptions = {
		projectId: '93dba83e8d9915dc6a65ffd3ecfd19fd',
	};

	const coinbaseInitOptions = {
		appName: 'Orderly',
		appLogoUrl: 'https://orderly.network/images/orderly-logo.svg',
		darkMode: true,
		chains: [8453],
	};

	const walletConnect = walletConnectModule(wcV2InitOptions);
	// @ts-ignore
	const ledger = ledgerModule(ledgerInitOptions);
	const coinbase = coinbaseModule(coinbaseInitOptions);

	return {
		
		onboard: {
			wallets: [
				injectedModule(),
				walletConnect,
				ledger,
				coinbase,
				// trezor,
			],
			appMetadata: {
				name: 'Funl AI',
				icon: '/Orderly.svg',
				description: 'Funl AI',
				recommendedInjectedWallets: [
					{ name: 'Coinbase', url: 'https://wallet.coinbase.com/' },
					{ name: 'MetaMask', url: 'https://metamask.io' },
					{ name: 'Trezor', url: 'https://trezor.io/' },
					{ name: 'Walletconnect', url: 'https://walletconnect.com/' },
					{ name: 'Ledger', url: 'https://www.ledger.com/' },
				],
				agreement: {
					version: '1.0.0',
					termsUrl: 'https://www.blocknative.com/terms-conditions',
					privacyUrl: 'https://www.blocknative.com/privacy-policy',
				},
				gettingStartedGuide: 'https://blocknative.com',
				explore: 'https://blocknative.com',
			},
		},
		app: {
			brokerId: 'funl_ai',
			brokerName: 'funl_ai',
			appIcons: {
				 main: {
					img: '/orderly-logo-secondary.svg',
				 },
				secondary: {
					img: '/orderly-logo-secondary.svg',
				},
			},
			
			chainFilter: { mainnet: [Base, Arbitrum, Optimism, Ethereum], testnet: [] },	
			enableSwapDeposit: false,
			footerStatusBarProps: {
				xUrl: 'https://x.com/Funl_ai/',
				telegramUrl: "https://t.me/c/2143076574/1",
			},
			shareOptions: {
				pnl: {
					backgroundImages: [
						'/images/poster_bg_1.png',
						'/images/poster_bg_2.png',
						'/images/poster_bg_3.png',
						'/images/poster_bg_4.png',
						'/images/poster_bg_5.png',
						'/images/poster_bg_6.png',
					],
				},
			},
		},
		tradingViewConfig: {
			scriptSRC: '/tradingview/charting_library/charting_library.js',
			library_path: '/tradingview/charting_library/',
			customCssUrl: '/tradingview/chart.css',
			// overrides: {
			// "paneProperties.backgroundType": "solid",
			// "paneProperties.background": "#1D1A26",

			"mainSeriesProperties.candleStyle.upColor": "#4CAF50",
			"mainSeriesProperties.candleStyle.downColor": "#FF5252",
			// "mainSeriesProperties.candleStyle.downColor": "#FF67C2",
			// "mainSeriesProperties.candleStyle.borderColor": "#00B59F",
			// "mainSeriesProperties.candleStyle.borderUpColor": "#00B59F",
			// "mainSeriesProperties.candleStyle.borderDownColor": "#FF67C2",
			// "mainSeriesProperties.candleStyle.wickUpColor": "#00B59F",
			// "mainSeriesProperties.candleStyle.wickDownColor": "#FF67C2",

			// // GRID lines
			// "paneProperties.vertGridProperties.color": "#26232F",
			// "paneProperties.horzGridProperties.color": "#26232F",

			// // text color
			// "scalesProperties.textColor": "#97969B",
			// "scalesProperties.lineColor": "#2B2833"
			// },
		},
	};
}

export const ORDERLY_SDK_DEMO_TITLE_KEY = 'orderly_sdk_demo_title_key';
