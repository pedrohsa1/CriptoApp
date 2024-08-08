import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { CoinProps } from '../home'

interface ResponseData {
  data: CoinProps
}

interface ErrorData {
  error: string;
}

type DataProps = ResponseData | ErrorData

export function Detail() {
  const { cripto } = useParams();
  const navigate = useNavigate();

  const [coin, setCoin] = useState<CoinProps>()

  useEffect(() => {
    async function getCoin(){
      try{
        fetch(`https://api.coincap.io/v2/assets/${cripto}`)
        .then(response => response.json())
        .then((data: DataProps) => {
          
          if("error" in data){
            navigate("/")
            return;
          }

          const price = Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD"
          })
    
          const priceCompact = Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
            notation: "compact"
          })

          const resultData = {
            ...data.data,
            formatedPrice: price.format(Number(data.data.priceUsd)),
            formatedMarket: priceCompact.format(Number(data.data.marketCapUsd)),
            formatedVolume: priceCompact.format(Number(data.data.volumeUsd24Hr))
          }

          setCoin(resultData)

        })


      }catch(err){
        console.log(err);
        navigate("/")
      } 
    }

    getCoin();
  }, [cripto]) 


  return (
    <div>
      <h1>Página Detalhe da moeda {cripto}</h1>
    </div>
  )
}