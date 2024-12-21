import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const EventNotFound = () => {
  return (
    <div className="container mx-auto py-8">
      <Card className="mx-auto max-w-5xl">
        <CardContent className="p-6">
          <h2 className="text-2xl font-bold text-center">
            Evento no encontrado
          </h2>
          <p className="text-center mt-4">
            Lo sentimos, el evento que estás buscando no existe o ha sido
            eliminado.
          </p>
          <div className="flex justify-center mt-6">
            <Button asChild>
              <a href="/">Volver a la página principal</a>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EventNotFound;
