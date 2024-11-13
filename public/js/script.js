document.getElementById('cepForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const cepInput = document.getElementById('cepInput').value;
    const resultDiv = document.getElementById('result');
    const savedCepsDiv = document.getElementById('savedCeps');

    try {
        const response = await fetch(`/consulta-cep/${cepInput}`);
        const data = await response.json();

        if (data.erro) {
            resultDiv.innerHTML = '<p>CEP não encontrado.</p>';
        } else {
            resultDiv.innerHTML = `
                <p><strong>CEP:</strong> ${data.cep}</p>
                <p><strong>Logradouro:</strong> ${data.logradouro}</p>
                <p><strong>Bairro:</strong> ${data.bairro}</p>
                <p><strong>Cidade:</strong> ${data.localidade}</p>
                <p><strong>Estado:</strong> ${data.uf}</p>
            `;

            // Criar o card do CEP
            const card = document.createElement('div');
            card.className = 'cep-card';
            card.innerHTML = `
                <p><strong>CEP:</strong> ${data.cep}</p>
                <p><strong>Logradouro:</strong> ${data.logradouro}</p>
                <p><strong>Bairro:</strong> ${data.bairro}</p>
                <p><strong>Cidade:</strong> ${data.localidade}</p>
                <p><strong>Estado:</strong> ${data.uf}</p>
            `;

            // Adicionar o card na seção de CEPs salvos
            savedCepsDiv.appendChild(card);
        }

        resultDiv.style.display = 'block';
    } catch (error) {
        resultDiv.innerHTML = '<p>Erro ao consultar o CEP.</p>';
        resultDiv.style.display = 'block';
    }
});
