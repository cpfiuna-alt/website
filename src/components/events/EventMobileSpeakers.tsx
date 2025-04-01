
import React from "react";
import { Users } from "lucide-react";

interface Speaker {
  name: string;
  role?: string;
  bio?: string;
  image?: string;
}

interface EventMobileSpeakersProps {
  speakers?: Speaker[];
}

const EventMobileSpeakers = ({ speakers }: EventMobileSpeakersProps) => {
  if (!speakers || speakers.length === 0) {
    return null;
  }
  
  return (
    <div className="mt-16 md:hidden">
      <h2 className="text-2xl font-bold mb-6 flex items-center">
        <Users className="mr-2 h-5 w-5" />
        Ponentes
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {speakers.map((speaker, index) => (
          <div key={index} className="bg-muted/10 p-4 rounded-lg">
            <div className="flex items-center mb-3">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary mr-3 overflow-hidden">
                {speaker.image ? (
                  <img 
                    src={speaker.image} 
                    alt={speaker.name} 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <Users className="h-6 w-6" />
                )}
              </div>
              <div>
                <div className="font-medium">{speaker.name}</div>
                {speaker.role && (
                  <div className="text-sm text-muted-foreground">{speaker.role}</div>
                )}
              </div>
            </div>
            {speaker.bio && (
              <p className="text-sm text-muted-foreground">{speaker.bio}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventMobileSpeakers;
