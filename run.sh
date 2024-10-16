# prod
pnpm i @orderly.network/react @orderly.network/web3-onboard @orderly.network/core @web3-onboard/coinbase
pnpm dev

pnpm i @web3-onboard/trezor @web3-onboard/walletconnect @web3-onboard/ledger @web3-onboard/injected-wallets
pnpm i @orderly.network/react@internal @orderly.network/web3-onboard@internal @orderly.network/core@internal @orderly.network/hooks@internal
pnpm dev

#build docket：
docker build -t orderly-web-demo .
#run docker：
docker run -p 3000:3000 orderly-web-demo


cd ../orderly-web
pnpm build

cd ../front-end
pnpm i 
pnpm dev