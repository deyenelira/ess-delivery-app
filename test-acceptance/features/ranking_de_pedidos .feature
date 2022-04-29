Feature: ranking de pedidos em determinado periodo
  As a cliente do aplicativo
  I want to poder ver informações sobre meus pedidos do periodo 
  So that eu possa entender quanto eu gastei, em que e onde 

  Scenario: cliente não comprou nada no periodo
    Given eu sou cliente 
    And eu não comprei nada no periodo
    When eu checo a página "expenses"
    Then aparece uma mensagem dizendo que nada foi comprado aquele periodo  

  Scenario: o item mais consumido foi o que trouxe o maior custo
    Given eu sou cliente 
    And eu comprei no periodo de "últimos 30 dias" exatamente "3" "pizza" que custam "40.00" reais cada do restaurante "Pizzaria Mia"
    And eu comprei no periodo de "últimos 30 dias" exatamente "2" "kebab" que custam "15.00" reais cada do restaurante "Kebabado"
    When eu checo a página "expenses"
    Then o destaque de comida mais pedida indica "pizza (Pizzaria Mia)"
    And o destaque de comida em que eu mais gastei indica "pizza (Pizzaria Mia)"
    And o custo total apresentado é "R$150"

  Scenario: o item mais consumido não foi o que trouxe um maior custo
    Given eu sou cliente 
    And eu comprei no periodo de "últimos 30 dias" exatamente "4" "pizza" que custam "40.00" reais cada do restaurante "Pizzaria Mia"
    And eu comprei no periodo de "últimos 30 dias" exatamente "6" "kebab" que custam "15.00" reais cada do restaurante "Kebabado"
    When eu checo a página "expenses"
    Then o destaque de comida mais pedida indica "kebab (Kebabado)"
    And  o destaque de comida em que eu mais gastei indica "pizza (Pizzaria Mia)"
    And o custo total apresentado é "R$250"

  Scenario: o item mais consumido não foi do restaurante com mais custo
    Given eu sou cliente  
    And eu comprei no periodo de "últimos 30 dias" exatamente "2" "pizza vegetariana" e "2" "pizza marguerita" que custam "40.00" e "30.00" reais cada do restaurante "Pizzaria Mia"
    And eu comprei no periodo de "últimos 30 dias" exatamente "6" "kebab" que custam "15.00" reais cada do restaurante "Kebabado"
    When eu checo a página "expenses"
    Then o destaque de comida mais pedida indica "kebab (Kebabado)"
    And  o destaque de restaurante onde eu mais gastei indica "Pizzaria Mia"
    And o custo total apresentado é "R$230"

  Scenario: o item mais consumido não foi do restaurante mais pedido
    Given eu sou cliente  
    And eu comprei no periodo de "últimos 30 dias" exatamente "3" "pizza vegetariana" e "3" "pizza marguerita" que custam "40.00" e "30.00" reais cada do restaurante "Pizzaria Mia"
    And eu comprei no periodo de "últimos 30 dias" exatamente "4" "kebab" que custam "15.00" reais cada do restaurante "Kebabado"
    When eu checo a página "expenses"
    Then o destaque de comida mais pedida indica "kebab (Kebabado)"
    And  o destaque de restaurante mais pedido indica "Pizzaria Mia"
    And o custo total apresentado é "R$270"

  Scenario: o restautante mais pedido não é o com mais custo
    Given eu sou cliente 
    And eu comprei no periodo de "últimos 30 dias" exatamente "4" "pizza vegetariana" que custam "40.00" reais cada do restaurante "Pizzaria Mia"
    And eu comprei no periodo de "últimos 30 dias" exatamente "6" "kebab" que custam "15.00" reais cada do restaurante "Kebabado" 
    When eu checo a página "expenses"
    Then o destaque de restaurante mais pedido indica "Kebabado"
    And o destaque de restaurante onde eu mais gastei indica "Pizzaria Mia" 
    And o custo total apresentado é "R$250"

  Scenario: o restautante mais pedido é o com mais custo
    Given eu sou cliente 
    And eu comprei no periodo de "últimos 30 dias" exatamente "4" "pizza vegetariana" que custam "40.00" reais cada do restaurante "Pizzaria Mia"
    And eu comprei no periodo de "últimos 30 dias" exatamente "1" "kebab" que custam "15.00" reais cada do restaurante "Kebabado" 
    When eu checo a página "expenses"
    Then o destaque de restaurante mais pedido indica "Kebabado"
    And o destaque de restaurante onde eu mais gastei indica "Pizzaria Mia" 
    And o custo total apresentado é "R$175" 
