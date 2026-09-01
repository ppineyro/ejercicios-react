type GreetingsProps = {
  name: string;
}

export function Greetings({ name }: GreetingsProps) {
  return (
    <div>
      <p>Hola, soy {name}</p>
      <p>g</p>
    </div>
  )
}