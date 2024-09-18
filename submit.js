function onFormSubmit(e) {
  processFormSubmission(e);
}

function processFormSubmission(e) {
  var sheet = e.source.getActiveSheet();
  
  // Obter a última linha preenchida após o envio do formulário
  var lastRow = sheet.getLastRow();
  
  // Inserir um ID crescente na primeira coluna (coluna A)
  var idColumn = 1; // Coluna A
  var idCell = sheet.getRange(lastRow, idColumn);
  
  // Definir o ID como o número da linha menos 1 (assumindo que a primeira linha é o cabeçalho)
  var newId = lastRow - 1;
  idCell.setValue(newId);

  // Definir a coluna alvo para status (coluna G, que é a coluna 7)
  var statusColumn = 7;
  var statusCell = sheet.getRange(lastRow, statusColumn);

  // Inserir o valor "Aguardando" na célula da coluna G
  statusCell.setValue('Aguardando');

  // Verificar se estamos na linha certa
  if (lastRow > 1) {
    // Obter valores das colunas E e F
    var dateValue = sheet.getRange(lastRow, 5).getValue(); // Coluna E
    var timeValue = sheet.getRange(lastRow, 6).getValue(); // Coluna F

    // Formatar data e hora como string
    var formattedDateTime = Utilities.formatDate(dateValue, Session.getScriptTimeZone(), 'dd/MM/yyyy') + 
                            ' - ' + 
                            Utilities.formatDate(timeValue, Session.getScriptTimeZone(), 'HH:mm:ss');

    // Inserir o valor concatenado na coluna H
    var targetCell = sheet.getRange(lastRow, 8); // Coluna H
    targetCell.setValue(formattedDateTime);
  }
}
