@api
Feature: Endereços (API)

Scenario: Pesquisar um endereço que retorne 3 ou mais logradouros via API Correios
    Given Consulto um endereço via API
    When O CEP é válido
    Then Três ou mais CEPs devem ser apresentados
