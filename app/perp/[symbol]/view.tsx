import { useEffect } from 'react';
import { TradingPage } from '@orderly.network/react';
import { OrderlyConfig } from '@/app/config';

interface Props {
	onSymbolChange: (symbol: any) => void;
	symbol: string;
}

const View = (props: Props) => {
	const { tradingViewConfig } = OrderlyConfig();

	useEffect(() => {
		const observer = new MutationObserver(() => {
			
			const confirmButton = document.querySelector('#orderly-order-entry-confirm-button');

			if (confirmButton && confirmButton instanceof HTMLButtonElement && confirmButton.style.display !== 'none') {

				//confirmButton.remove();

				const divForm = document.querySelector('#orderly-order-entry-form');
				if (divForm) {
					divForm.remove();					
				}
			}	
			
			const warningElement = document.querySelector('#orderly-chain-id-switch');
			if (warningElement) {
				warningElement.remove();
			}

			
		});
	  
		observer.observe(document.body, { childList: true, subtree: true });
	  
		return () => observer.disconnect();  
	  }, []);
	  
	  

	return (
		<TradingPage
			symbol={props.symbol}
			tradingViewConfig={tradingViewConfig}
			onSymbolChange={props.onSymbolChange}
		/>
	);
};

export default View;
