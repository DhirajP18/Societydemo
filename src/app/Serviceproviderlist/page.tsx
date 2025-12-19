"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Phone,
  Mail,
  MapPin,
  Star,
  Wrench,
  Zap,
  PaintBucket,
  Camera,
  Scissors,
  ChevronDown,
} from "lucide-react";

interface ServiceProvider {
  id: number;
  name: string;
  service: string;
  category: string;
  phone: string;
  email: string;
  address: string;
  mapLink: string;
  rating: number;
  experience: string;
}

const SERVICE_PROVIDERS: ServiceProvider[] = [
  {
    id: 1,
    name: "Rajesh Kumar",
    service: "Plumbing Expert",
    category: "Plumber",
    phone: "+91 98765 43210",
    email: "rajesh.plumber@example.com",
    address: "Shop No. 12, Near Society Gate, Mumbai",
    mapLink:
      "https://maps.google.com/?q=Shop+No.+12+Near+Society+Gate+Mumbai",
    rating: 4.8,
    experience: "8 years",
  },
  {
    id: 2,
    name: "Amit Sharma",
    service: "Electrical Repairs",
    category: "Electrician",
    phone: "+91 87654 32109",
    email: "amit.electric@example.com",
    address: "B-45, Electric Market, Powai, Mumbai",
    mapLink:
      "https://maps.google.com/?q=B-45+Electric+Market+Powai+Mumbai",
    rating: 4.9,
    experience: "10 years",
  },
  {
    id: 3,
    name: "Sunita Devi",
    service: "House Painting",
    category: "Painter",
    phone: "+91 76543 21098",
    email: "sunita.painter@example.com",
    address: "Flat 201, Colors Building, Andheri West",
    mapLink:
      "https://maps.google.com/?q=Flat+201+Colors+Building+Andheri+West+Mumbai",
    rating: 4.7,
    experience: "6 years",
  },
  {
    id: 4,
    name: "Vikram Singh",
    service: "CCTV & Security",
    category: "Technician",
    phone: "+91 65432 10987",
    email: "vikram.cctv@example.com",
    address: "Tech Zone, Shop 8, Hiranandani Gardens",
    mapLink:
      "https://maps.google.com/?q=Tech+Zone+Shop+8+Hiranandani+Gardens+Mumbai",
    rating: 4.6,
    experience: "5 years",
  },
  {
    id: 5,
    name: "Priya Salon",
    service: "Beauty & Hair",
    category: "Salon",
    phone: "+91 54321 09876",
    email: "priya.salon@example.com",
    address: "Ground Floor, Beauty Hub, Bandra West",
    mapLink:
      "https://maps.google.com/?q=Beauty+Hub+Ground+Floor+Bandra+West+Mumbai",
    rating: 4.9,
    experience: "7 years",
  },
];

const categoryIcons: Record<string, React.ReactNode> = {
  Plumber: <Wrench className="w-6 h-6" />,
  Electrician: <Zap className="w-6 h-6" />,
  Painter: <PaintBucket className="w-6 h-6" />,
  Technician: <Camera className="w-6 h-6" />,
  Salon: <Scissors className="w-6 h-6" />,
};

export default function ServiceProvidersPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = [
    "All",
    ...Array.from(new Set(SERVICE_PROVIDERS.map((p) => p.category))),
  ];

  const filteredProviders = SERVICE_PROVIDERS.filter((provider) => {
    const term = searchTerm.toLowerCase();
    return (
      (provider.name.toLowerCase().includes(term) ||
        provider.service.toLowerCase().includes(term) ||
        provider.address.toLowerCase().includes(term)) &&
      (selectedCategory === "All" ||
        provider.category === selectedCategory)
    );
  });

  const getRatingStars = (rating: number) =>
    Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-3.5 h-3.5 ${
          i < Math.floor(rating)
            ? "fill-yellow-400 text-yellow-400"
            : "text-gray-300 dark:text-gray-600"
        }`}
      />
    ));

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto p-3 sm:p-4">
        {/* Header */}
        <div className="mb-4">
          <h1 className="text-2xl font-bold">Service Providers</h1>
          <p className="text-sm text-muted-foreground">
            Tap card to view details
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 mb-5">
          <Input
            placeholder="Search name, service..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Select
            value={selectedCategory}
            onValueChange={setSelectedCategory}
          >
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {categories.map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredProviders.map((provider) => (
            <Card
              key={provider.id}
              className="hover:shadow-lg transition-shadow"
            >
              <Accordion type="single" collapsible>
                <AccordionItem value="details" className="border-0">
                  <AccordionTrigger className="px-4 py-4 hover:no-underline">
                    <div className="flex items-center gap-3 w-full">
                      {/* Icon */}
                      <div className="p-3 rounded-full bg-primary/10 text-primary shrink-0">
                        {categoryIcons[provider.category]}
                      </div>

                      {/* Name + Service + Stars */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <h3 className="font-semibold text-sm truncate">
                            {provider.name}
                          </h3>
                          <div className="flex items-center gap-0.5 shrink-0">
                            {getRatingStars(provider.rating)}
                          </div>
                        </div>

                        <p className="text-xs text-muted-foreground truncate">
                          {provider.service}
                        </p>
                      </div>

                      <ChevronDown className="h-5 w-5 text-muted-foreground shrink-0 transition-transform group-data-[state=open]:rotate-180" />
                    </div>
                  </AccordionTrigger>

                  <AccordionContent>
                    <CardContent className="pt-4 space-y-4 border-t">
                      <div className="space-y-3 text-sm">
                        <div className="flex items-center gap-3">
                          <Phone className="w-4 h-4 text-muted-foreground" />
                          <a
                            href={`tel:${provider.phone}`}
                            className="font-medium hover:text-primary"
                          >
                            {provider.phone}
                          </a>
                        </div>

                        <div className="flex items-center gap-3">
                          <Mail className="w-4 h-4 text-muted-foreground" />
                          <a
                            href={`mailto:${provider.email}`}
                            className="truncate hover:text-primary"
                          >
                            {provider.email}
                          </a>
                        </div>

                        <div className="flex items-start gap-3">
                          <MapPin className="w-4 h-4 text-muted-foreground mt-0.5" />
                          <p className="text-muted-foreground">
                            {provider.address}
                          </p>
                        </div>

                        <p>
                          Experience:{" "}
                          <span className="font-medium">
                            {provider.experience}
                          </span>
                        </p>
                      </div>

                      <div className="grid grid-cols-2 gap-2 pt-2">
                        <Button asChild size="sm">
                          <a href={`tel:${provider.phone}`}>
                            <Phone className="w-4 h-4 mr-1" />
                            Call
                          </a>
                        </Button>
                        <Button asChild variant="outline" size="sm">
                          <a
                            href={provider.mapLink}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <MapPin className="w-4 h-4 mr-1" />
                            Map
                          </a>
                        </Button>
                      </div>
                    </CardContent>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
