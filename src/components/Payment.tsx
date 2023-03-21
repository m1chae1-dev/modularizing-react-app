import React, { useState, useEffect } from 'react';
import { LocalPaymentMethod, RemotePaymentMethod } from '../model';

import "../styles/payment.css"

interface Props {
    amount: number
}

const usePaymentMethods = () => {
    const [paymentMethods, setPaymentMethods] = useState<LocalPaymentMethod[]>([])

    useEffect(() => {
        const fetchPaymentMethods = async () => {
            const url = "https://dummyjson.com/users"

            const response = await fetch(url)
            const methods: RemotePaymentMethod = await response.json()

            if (methods.users.length > 0) {
                const extended: LocalPaymentMethod[] = methods.users.map((method) => ({
                    provider: method.bank.cardType,
                    label: `Pay with ${method.bank.cardType}`,
                    image: method.image,
                    name: method.firstName
                }))
                extended.push({ provider: "cash", label: "Pay in cash" })
                setPaymentMethods(extended)
            } else {
                setPaymentMethods([])
            }
        }

        fetchPaymentMethods()
    }, [])

    return {
        paymentMethods
    }
}

const Payment: React.FC<Props> = ({ amount }) => {
    const { paymentMethods } = usePaymentMethods()

    return (
        <div>
            <div className='payment_product_container'>
                <h3>Order Details</h3>
                <div>
                    {paymentMethods.slice(28,30).map((product) => (
                        <div key={product.provider} className='payment_product_card'>
                            <img className='payment_product_image' src={product.image} />
                            <p>{product.name}</p>
                        </div>
                    ))}
                </div>
            </div>
            <div className='payment_container'>
                <h3>Payment</h3>
                <div className='payment_types'>
                    {paymentMethods.slice(28,31).map((method) => (
                        <label key={method.provider}>
                            <input
                                type="radio"
                                name="payment"
                                value={method.provider}
                                defaultChecked={method.provider === "cash"}
                            />
                            <span>{method.label}</span>
                        </label>
                    ))}
                </div>
                <hr />
                <button className='payment_btn'>${amount}</button>
            </div>
        </div>
    )
}
 
export default Payment