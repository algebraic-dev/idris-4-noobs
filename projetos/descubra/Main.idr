module Main

-- Definimos uma constante chamada numero secreto
numeroSecreto : Int 
numeroSecreto = 23

main : IO ()
main = do
  putStrLn "Digite um número: "
  linha <- getLine
  let numero = cast linha 
  case compare numero numeroSecreto of 
    EQ => putStrLn "Voce ganhou!!!" 
    LT => do
            putStrLn "Esse número é muito menor!"
            main
    GT => do
            putStrLn "Esse número é muito mais alto!"
            main