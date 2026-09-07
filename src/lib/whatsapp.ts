const WHATSAPP_NUMBER = "5511962071750";

export function buildWhatsAppLink(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export const whatsappMessages = {
  home: "Olá! Vim pelo site da Boca Sublimação e gostaria de conhecer os produtos personalizados.",
  contato: "Olá! Vim pelo site da Boca Sublimação e gostaria de fazer um orçamento.",
  entrega: "Olá! Vim pelo site da Boca Sublimação e gostaria de consultar uma entrega.",
  produto: (nome: string) =>
    `Olá! Vim pelo site da Boca Sublimação e gostaria de solicitar um orçamento para: ${nome}.`,
};
