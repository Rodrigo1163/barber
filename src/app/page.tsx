import { SearchIcon } from "lucide-react";
import Header from "./_components/header";
import { Button } from "./_components/ui/button";
import { Input } from "./_components/ui/input";
import Image from "next/image";
import { Card, CardContent } from "./_components/ui/card";
import { db } from "./_lib/prisma";
import BarbershopItem from "./_components/barbershop-item";
import { quickSeachOptions } from "./_contants/search";
import BookingItem from "./_components/booking-item";


export default async function Home() {

  const barbershops = await db.barbershop.findMany({})
  const popularBarbershops = await db.barbershop.findMany({
    orderBy: {
      name: "desc"
    }
  })
  return (
    <div>
      <Header />
      <div className="p-5">
        <h2 className="text-xl font-bold">Olá, Rodrigo!</h2>
        <p>Quinta-feira, 08 de agosto</p>

        <div className="mt-6 flex flex-row items-center gap-2">
          <Input placeholder="Faça sua busca..." />
          <Button>
            <SearchIcon />
          </Button>
        </div>

        <div className="flex gap-3 mt-6 overflow-x-scroll [&::-webkit-scrollbar]:hidden">
          {quickSeachOptions.map(option => (
            <Button className="gap-2" variant="secondary" key={option.title}>
              <Image
                src={option.imageUrl}
                width={16}
                height={16}
                alt={option.title}
              />
              {option.title}
            </Button>
          ))}

        </div>
        <div className="relative w-full h-[150px] mt-6">
          <Image
            alt="Agende nos melhores com FSW Barber"
            src="/banner-01.png"
            fill
            className="object-cover rounded-xl"
          />
        </div>

        <BookingItem />

        <h2 className="text-xs font-bold uppercase text-gray-400 mt-6 mb-3">
          Recomendados
        </h2>

        <div className="flex gap-4 overflow-auto [&::-webkit-scrollbar]:hidden">
          {barbershops.map(barbershop =>
            <BarbershopItem key={barbershop.id}
              barbershop={barbershop}
            />)}
        </div>

        <h2 className="text-xs font-bold uppercase text-gray-400 mt-6 mb-3">
          populares
        </h2>

        <div className="flex gap-4 overflow-auto [&::-webkit-scrollbar]:hidden">
          {popularBarbershops.map(barbershop =>
            <BarbershopItem key={barbershop.id}
              barbershop={barbershop}
            />)}
        </div>



      </div>

      <footer>
        <Card >
          <CardContent className="py-6 px-5">
            <p className="text-sm text-gray-400">@ 2023 Copyright <span className="font-bold">FWS Barber</span> </p>
          </CardContent>
        </Card>
      </footer>
    </div>
  )
}
