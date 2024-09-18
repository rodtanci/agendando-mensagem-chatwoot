function onEdit(e) {
  var sheet = e.source.getActiveSheet();
  var range = e.range;
  
  // Verificar se a edição está em uma linha nova
  if (range.getRow() > 1) {
    // Ação 1: Inserir um ID crescente na coluna A
    var idCell = sheet.getRange(range.getRow(), 1); // Coluna A
    if (idCell.getValue() === "") {
      var newId = range.getRow() - 1; // Assumindo que a primeira linha é o cabeçalho
      idCell.setValue(newId);
    }
    
    // Ação 2: Preencher a coluna G com "Aguardando" se estiver vazia
    if (range.getColumn() !== 7) { // Ignora edição na coluna G
      var statusCell = sheet.getRange(range.getRow(), 7); // Coluna G
      if (statusCell.getValue() === "") {
        statusCell.setValue("Aguardando");
      }
    }

    // Ação 3: Inserir a data e hora atual na coluna I
    var dateCell = sheet.getRange(range.getRow(), 9); // Coluna I
    dateCell.setValue(formatDate(new Date()));
  }
}

// Função para formatar a data no formato desejado
function formatDate(date) {
  var dd = String(date.getDate()).padStart(2, '0');
  var MM = String(date.getMonth() + 1).padStart(2, '0'); // Janeiro é 0!
  var yyyy = date.getFullYear();
  
  var hh = String(date.getHours()).padStart(2, '0');
  var mm = String(date.getMinutes()).padStart(2, '0');
  var ss = String(date.getSeconds()).padStart(2, '0');
  
  return dd + '/' + MM + '/' + yyyy + ' ' + hh + ':' + mm + ':' + ss;
}
