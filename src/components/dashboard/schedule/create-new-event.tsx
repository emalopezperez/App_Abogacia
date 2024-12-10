"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const CreateNewEvent = ({ data, setData }: { data: any; setData: any }) => {
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleDurationChange = (value: string) => {
    setData({ ...data, duration: value });
  };

  return (
    <Card>
      <form noValidate className="space-y-6 pb-8">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">Crear Evento</CardTitle>
          <CardDescription>
            Crear un nuevo evento que permita a los usuarios agendar citas.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              name="title"
              defaultValue="Agenda de la semana"
              placeholder="Enter appointment title"
              onChange={handleChange}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="url">URL Slug</Label>
            <div className="flex rounded-md shadow-sm">
              <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-input bg-muted text-muted-foreground text-sm">
                agenda.com/
              </span>
              <Input
                type="text"
                id="url"
                name="url"
                defaultValue="example-user-1"
                placeholder="your-custom-url"
                className="rounded-l-none"
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              defaultValue="30 min meeting"
              placeholder="Describe the purpose of this appointment type"
              className="h-24"
              onChange={handleChange}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="duration">Duration</Label>
            <Select
              name="duration"
              defaultValue="30"
              onValueChange={handleDurationChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select the duration" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="15">15 minutes</SelectItem>
                  <SelectItem value="30">30 minutes</SelectItem>
                  <SelectItem value="45">45 minutes</SelectItem>
                  <SelectItem value="60">1 hour</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </form>
    </Card>
  );
};

export default CreateNewEvent;
