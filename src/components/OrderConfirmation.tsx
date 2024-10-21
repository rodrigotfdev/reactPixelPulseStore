import React from 'react';
import { useLocation, Link } from 'react-router-dom';

interface OrderDetails {
  orderNumber: string;
  items: Array<{
    id: number;
    name: string;
    price: number;
    quantity: number;
    photoName: string;
    specs: {
      memorySize: string;
      memoryType: string;
    };
  }>;
  shippingInfo: {
    fullName: string;
    address: string;
    city: string;
    postalCode: string;
    country: string;
  };
  totalPrice: number;
}

const OrderConfirmation: React.FC = () => {
  const location = useLocation();
  const orderDetails = location.state as OrderDetails;

  if (!orderDetails) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-3xl font-extrabold text-gray-900">Confirmação do Pedido</h2>
        <p className="mt-2 text-lg text-gray-600">Nenhum detalhe do pedido encontrado. Por favor, tente fazer um pedido novamente.</p>
        <Link to="/" className="mt-4 inline-block text-indigo-600 hover:text-indigo-500">
          Voltar para a Home
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h2 className="text-3xl font-extrabold text-gray-900">Confirmação do Pedido</h2>
      <p className="mt-2 text-lg text-gray-600">Obrigado pelo seu pedido!</p>
      
      <div className="mt-8">
        <h3 className="text-xl font-semibold text-gray-900">Detalhes do Pedido</h3>
        <p className="mt-2 text-gray-600">Número do Pedido: {orderDetails.orderNumber}</p>
        
        <div className="mt-6">
          <h4 className="text-lg font-semibold text-gray-900">Itens Pedidos</h4>
          <ul className="mt-2 divide-y divide-gray-200">
            {orderDetails.items.map((item) => (
              <li key={item.id} className="py-4 flex">
                <img src={`/${item.photoName}`} alt={item.name} className="h-20 w-20 rounded-md object-cover mr-4" />
                <div className="flex-1">
                  <h5 className="text-md font-medium text-gray-900">{item.name}</h5>
                  <p className="mt-1 text-sm text-gray-500">
                    {item.specs.memorySize} {item.specs.memoryType}
                  </p>
                  <p className="mt-1 text-sm text-gray-500">
                    Quantidade: {item.quantity} | Preço: R$ {item.price.toFixed(2)}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="mt-6">
          <h4 className="text-lg font-semibold text-gray-900">Informações de Envio</h4>
          <p className="mt-2 text-gray-600">{orderDetails.shippingInfo.fullName}</p>
          <p className="text-gray-600">{orderDetails.shippingInfo.address}</p>
          <p className="text-gray-600">
            {orderDetails.shippingInfo.city}, {orderDetails.shippingInfo.postalCode}
          </p>
          <p className="text-gray-600">{orderDetails.shippingInfo.country}</p>
        </div>
        
        <div className="mt-6">
          <h4 className="text-lg font-semibold text-gray-900">Total</h4>
          <p className="mt-2 text-xl font-bold text-gray-900">R$ {orderDetails.totalPrice.toFixed(2)}</p>
        </div>
      </div>
      
      <Link to="/" className="mt-8 inline-block bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-500">
        Continuar Comprando
      </Link>
    </div>
  );
};

export default OrderConfirmation;
