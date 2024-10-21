import React from "react";
import {
  AiOutlineTwitter,
  AiFillFacebook,
  AiFillInstagram,
} from "react-icons/ai";

const Footer: React.FC = () => {
  return (
    <div className="footer-container flex flex-col">
      <div className="footer flex flex-col justify-around bg-neutral-800 text-white">
        <div className="top-section flex justify-around w-full">
          <div className="left-footer-section">
            <h2 className="text-cyan-400 mb-5 mt-20">Empresa</h2>
            <ul>
              <li className="mt-5 hover:text-cyan-400">
                <a href="#">Sobre Nós</a>
              </li>
              <li className="mt-5 hover:text-cyan-400">
                <a href="#">Termos e Condições de Venda</a>
              </li>
              <li className="mt-5 hover:text-cyan-400">
                <a href="#">Política de Trocas e Devoluções</a>
              </li>
              <li className="mt-5 hover:text-cyan-400">
                <a href="#">Política de Cookies</a>
              </li>
            </ul>
          </div>
          <div className="middle-footer-section">
            <ul>
              <h2 className="text-cyan-400 mb-5 mt-20">FAQ</h2>
              <li className="mt-5 hover:text-cyan-400">
                <a href="#">Como Comprar</a>
              </li>
              <li className="mt-5 hover:text-cyan-400">
                <a href="#">Envios e Entregas</a>
              </li>
              <li className="mt-5 hover:text-cyan-400">
                <a href="#">Métodos de Pagamento</a>
              </li>
              <li className="mt-5 hover:text-cyan-400">
                <a href="#">Programa de Parceria</a>
              </li>
            </ul>
          </div>
          <div className="right-footer-section">
            <ul>
              <h2 className="text-cyan-400 mb-5 mt-20">Cliente</h2>
              <li className="mt-5 hover:text-cyan-400">
                <a href="#">Minha Conta</a>
              </li>
              <li className="mt-5 hover:text-cyan-400">
                <a href="#">Meus Pedidos</a>
              </li>
              <li className="mt-5 hover:text-cyan-400">
                <a href="#">Meus Tickets</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="social-section bg-neutral-700 mt-28 flex flex-col items-center">
          <div className="social-text h-14 w-full flex justify-center items-center">
            <p>Nos Siga</p>
          </div>
          <div className="social-icons flex flex-row items-center justify-around w-96 h-28">
            <a href="#" className="hover:text-cyan-400">
              <AiOutlineTwitter className="text-7xl" />
            </a>
            <a href="#" className="hover:text-cyan-400">
              <AiFillFacebook className="text-7xl" />
            </a>
            <a href="#" className="hover:text-cyan-400">
              <AiFillInstagram className="text-7xl" />
            </a>
          </div>
        </div>
        <div className="company-section py-10 flex flex-row justify-center">
          <div className="company-section-logo">
            <img
              src="/productsImg/main-logo.png"
              alt="Logotipo da Empresa"
              className="w-80"
            />
          </div>
          <div className="company-section-desc text-white flex flex-col text-center justify-center w-4/12">
            <p>Rede Âncora</p>

            <p className="uppercase">Atendimento ao Cliente</p>
            <p>De segunda a sexta-feira, das 9:00 às 18:00</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
