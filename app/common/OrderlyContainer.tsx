'use client';
import { PropsWithChildren, useCallback } from 'react';
import { ConnectorProvider } from '@orderly.network/web3-onboard';
import { OrderlyAppProvider } from '@orderly.network/react';
import { OrderlyConfig } from '@/app/config';
import { CustomConfigStore, ENV_NAME } from './CustomConfigStore';
import NavbarTab from './NavbarTab';
import { _orderlySymbolKey } from '../constant';
import { useRouter } from 'next/navigation';
import { CustomContractManager } from './CustomContract';
import { ARBITRUM_TESTNET_CHAINID, MANTLE_TESTNET_CHAINID } from '@orderly.network/types';
import { WalletConnectorContext } from "@orderly.network/hooks";
import { createWeb3Modal, defaultWagmiConfig, useWeb3Modal } from "@web3modal/wagmi/react";

export type NetworkId = 'testnet' | 'mainnet';

const { open } = useWeb3Modal();

export const WalletConnector = ({ children }: PropsWithChildren) => {
	return (
	  <WalletConnectorContext.Provider
	  	setChain={
		  {
			chainId: 8453,
		  }
		}
	  >
		{children}
	  </WalletConnectorContext.Provider>
	);
  };
  

const HostEnvMap: Record<string, ENV_NAME> = {
	'dev-sdk-demo.orderly.network': 'dev',
	'qa-sdk-demo.orderly.network': 'qa',
	'sdk-demo-iap.orderly.network': 'staging',
	'localhost': 'staging',
};
type OrderlyContainerProps = PropsWithChildren<{
	symbol?: string;
}>;

const OrderlyContainer: React.FC<OrderlyContainerProps> = (props) => {
	const networkId = (localStorage.getItem('orderly-networkId') ?? 'mainnet') as NetworkId;
	const router = useRouter();

	const { onboard, app } = OrderlyConfig();

	const onChainChanged = useCallback(
		(chainId, isTestnet) => {
			// console.log('chain changed', chainId, isTestnet);
			localStorage.setItem('orderly-networkId', isTestnet ? 'testnet' : 'mainnet');
			// realod page
			setTimeout(() => {
				window.location.reload();
			}, 100);
		},
		[props.symbol],
	);

	const env = networkId === 'mainnet' ? 'prod' : HostEnvMap[window.location.hostname] || 'staging';

	const configStore = new CustomConfigStore({ networkId, env });
	const contracts = new CustomContractManager(configStore);

	const connect = useCallback(() => {
		return open().then((res: any) => {
		  console.log(res);
		  return [];
		});
	}, []);

	return (
		<ConnectorProvider options={onboard as any}>
			<OrderlyAppProvider
				configStore={configStore}
				// contracts={contracts}
				networkId={networkId}
				brokerId={app.brokerId}
				brokerName={app.brokerName}
				appIcons={app.appIcons}
				onChainChanged={onChainChanged}
				footerStatusBarProps={app.footerStatusBarProps}
				shareOptions={app.shareOptions}
				chainFilter={app.chainFilter}
				topBarProps={{
					left: (
						<div className="orderly-h-[48px] orderly-p-3">
							<img className="orderly-w-[200px] orderly-h-[24px]" src="/orderly-logo.svg" />
						</div>
					),
					nav: <NavbarTab />,
				}}
				referral={{
					saveRefCode: true,
					onBoundRefCode: (success: boolean, error: any) => {
						const path = window.location.pathname;
						if ((path.endsWith('/dashboard') || path.endsWith('/referral')) && success) {
							router.push('/referral/dashboard');
						}
					},
					onClickReferral: () => {
						router.push('/referral/dashboard');
					},
				}}
				theme={undefined}	
						
			>
				  {/* Wrap the children with WalletConnector here */}
				  <WalletConnector  value={{ connect }}>
          			{props.children}
        		</WalletConnector>

				
			</OrderlyAppProvider>
		</ConnectorProvider>
	);
};

export default OrderlyContainer;
