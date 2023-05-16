@front
Feature: CEP (Front)

Scenario: Pesquisar um CEP que retorne 3 ou mais logradouros via Web Correios
    Given Estou na página inciial do Correios
    When Pesquiso um CEP
    Then Três ou mais endereços devem ser apresentados


