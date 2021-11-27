module Donuts 

data Sabor   
  = Chocolate 
  | Morango 

data Produto 
  = Donut Sabor 
  | Caixa (List Produto)

record Pedido where 
  constructor MkPedido
  nome : String
  endereco : String
  produto : Produto

record Nota where 
  constructor MkNota
  pedido : Pedido 
  confirmado : Bool
  preco : Int

-- Calculamos o preço adicional do sabor

calcularPrecoSabor : Sabor -> Int
calcularPrecoSabor Chocolate = 2
calcularPrecoSabor Morango = 1

-- Utilizamos a função map para pegar o preço de cada produto da lista
-- e após isso aplicamos a função `sum` que é definida no preludio para somar
-- vamos números.

calcularPreco : Produto -> Int
calcularPreco (Donut sabor) = 5 + calcularPrecoSabor sabor 
calcularPreco (Caixa prods) = sum (map calcularPreco prods) - 3

-- Agora podemos criar a nota através do pedido utilizando
-- o produto dentro do pedido para calcular o preço e colocando
-- como verificado sendo falso
criarNota : Pedido -> Nota 
criarNota pedido = MkNota pedido False (calcularPreco pedido.produto)

verificarNota : Nota -> Nota 
verificarNota nota = record { confirmado = True } nota

paraTexto : Nota -> String 
paraTexto (MkNota (MkPedido nome endereco produto) conf preco) = 
        """
        Nota fiscal:
        nome: \{nome}
        endereco: \{endereco}
        produto: \{mostrarProduto produto}
        preco: \{show preco}
        """
    where

        -- Não iremos implementar isso nesse momento para não deixar verboso
        mostrarProduto : Produto -> String 
        mostrarProduto (Donut sabor) = "donut"
        mostrarProduto (Caixa prods) = "caixa"

-- Agora podemos fazer um workflow simples para criar um pedido

-- Essa função serve para o cliente escolher o sabor do produto.
-- Nesse caso iremos utilizar a função "pure" para retornar um IO 
-- de algo "puro"
-- Ou seja, (pure 3) é IO Int

escolherSabor : IO Sabor 
escolherSabor = do 
    putStrLn "Digite 1 para Morango ou 2 para Chocolate"
    resultado <- getLine 
    case resultado of 
        "1" => pure Morango 
        "2" => pure Chocolate
        _   => do 
            putStrLn "Opção inválida!"
            escolherSabor -- Mantem um loop

-- Um bloco de mutual faz com que as funções dentro possam 
-- ser recursivas de forma com que uma chame a outra.
mutual 
    -- Serve para colher diversos produtos
    escolherProdutos : IO (List Produto) 
    escolherProdutos = do 
        putStrLn "Deseja adicionar um produto [s\\n]"
        res <- getLine
        case res of 
          "n" => pure []
          "s" => do 
                produto <- escolherProduto
                outros <- escolherProdutos
                pure (produto :: outros) -- retorna o produto com outros na frente.
          _ => do 
                putStrLn "Opção inválida!"
                escolherProdutos
        
    escolherProduto : IO Produto 
    escolherProduto = do 
        putStrLn "Digite 1 para Donut individual ou 2 para Caixa de Donuts"
        res <- getLine
        case res of 
          "1" => do 
            sabor <- escolherSabor
            pure (Donut sabor)
          "2" => do 
            produtos <- escolherProdutos 
            pure (Caixa produtos)
          _ => do 
            putStrLn "Opção inválida!"
            escolherProduto
    

main : IO ()
main = do 
    putStrLn "Gostaria de fazer um pedido? [s/n]"
    res <- getLine
    case res of
        "s" => do
          putStrLn "Digite o seu nome:"
          nome <- getLine

          putStrLn "Digite o seu endereco:"
          endereco <- getLine

          -- Entramos numa outra função que retorna um IO Produto
          -- para pegar o produto
          produto <- escolherProduto

          -- Gerar um produto retorna IO então temos que criar usando um let
          let pedido = MkPedido nome endereco produto
          
          -- Geramos a nota
          putStrLn (paraTexto (criarNota pedido))
        _ => putStrLn "Até mais" -- Caso digite qualquer outra coisa ele só diz Até mais
