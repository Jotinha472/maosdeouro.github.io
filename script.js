const urlAPI = "https://script.google.com/macros/s/AKfycbyY9yuXcNEjXMs9bCNFNoRU-WC8P5authF8Gl47RDAZCumPNUcbwiTiBTMW8G3EgUC3/exec";

const dataInput = document.getElementById("data");

// trava hoje
const hoje = new Date();
hoje.setDate(hoje.getDate() + 1);
dataInput.min = hoje.toISOString().split("T")[0];

async function verificarHorario() {
  const data = document.getElementById("data").value;
  const hora = document.getElementById("hora").value;
  const status = document.getElementById("statusData");

  if (!data || !hora) return;

  const resposta = await fetch(urlAPI, {
    method: "POST",
    body: JSON.stringify({ data, hora, verificar: true })
  });

  const resultado = await resposta.json();

  if (resultado.status === "ocupado") {
    status.textContent = "❌ Horário indisponível";
    status.style.color = "red";
  } else {
    status.textContent = "✅ Horário disponível";
    status.style.color = "green";
  }
}

document.getElementById("form-agendamento").addEventListener("submit", async function(e) {
  e.preventDefault();

  const dados = {
    nome: nome.value,
    whats: whats.value,
    servico: servico.value,
    data: data.value,
    hora: hora.value,
    endereco: endereco.value
  };

  const status = document.getElementById("statusData");

  const resposta = await fetch(urlAPI, {
    method: "POST",
    body: JSON.stringify(dados)
  });

  const resultado = await resposta.json();

  if (resultado.status === "ocupado") {
    status.textContent = "❌ Esse horário já foi reservado";
    status.style.color = "red";
    return;
  }

  const telefone = "5511941494542";

  const msg =
`Olá! Gostaria de confirmar meu agendamento 🧹✨

👤 Nome: ${dados.nome}
🧽 Serviço: ${dados.servico}
📅 Data: ${dados.data}
⏰ Horário: ${dados.hora}
📍 Endereço: ${dados.endereco}`;

  window.open(`https://wa.me/${telefone}?text=${encodeURIComponent(msg)}`, "_blank");

  this.reset();
  status.textContent = "";
});
