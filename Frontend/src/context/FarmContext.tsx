import React, { createContext, useContext, useState, useEffect } from 'react';
import { Farm } from '../../types';

interface FarmContextType {
    activeFarm: Farm | null;
    setActiveFarm: (farm: Farm | null) => void;
    farms: Farm[];
    setFarms: (farms: Farm[]) => void;
}

const FarmContext = createContext<FarmContextType | undefined>(undefined);

export const FarmProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [farms, setFarms] = useState<Farm[]>([]);
    const [activeFarm, setActiveFarm] = useState<Farm | null>(null);

    // Helper to remove duplicate crops (case-insensitive)
    const deduplicateFarms = (farmList: Farm[]): Farm[] => {
        return farmList.map(farm => {
            if (!farm.crops || !Array.isArray(farm.crops)) return farm;
            const seen = new Set<string>();
            const uniqueCrops: string[] = [];
            for (const crop of farm.crops) {
                const lowerCrop = crop.toLowerCase().trim();
                if (!seen.has(lowerCrop)) {
                    seen.add(lowerCrop);
                    uniqueCrops.push(crop.trim());
                }
            }
            return { ...farm, crops: uniqueCrops };
        });
    };

    // Persist active farm index to localStorage
    useEffect(() => {
        const savedFarms = localStorage.getItem('userFarms');
        if (savedFarms) {
            try {
                const parsedFarms = JSON.parse(savedFarms);
                const dedupedFarms = deduplicateFarms(parsedFarms);
                setFarms(dedupedFarms);

                const savedActiveIndex = localStorage.getItem('activeFarmIndex');
                if (savedActiveIndex !== null && dedupedFarms[parseInt(savedActiveIndex)]) {
                    setActiveFarm(dedupedFarms[parseInt(savedActiveIndex)]);
                } else if (dedupedFarms.length > 0) {
                    setActiveFarm(dedupedFarms[0]);
                }
            } catch (e) {
                console.error("Failed to parse farms from storage", e);
            }
        }
    }, []);

    const handleSetActiveFarm = (farm: Farm | null) => {
        if (farm) {
            farm = deduplicateFarms([farm])[0];
        }
        setActiveFarm(farm);
        if (farm) {
            const index = farms.findIndex(f => f.nickname === farm.nickname && f.landSize === farm.landSize);
            if (index !== -1) {
                localStorage.setItem('activeFarmIndex', index.toString());
            }
        } else {
            localStorage.removeItem('activeFarmIndex');
        }
    };

    const handleSetFarms = (newFarms: Farm[]) => {
        const dedupedFarms = deduplicateFarms(newFarms);
        setFarms(dedupedFarms);
        localStorage.setItem('userFarms', JSON.stringify(dedupedFarms));
        // Reset active farm if common
        if (dedupedFarms.length > 0 && (!activeFarm || !dedupedFarms.find(f => f.nickname === activeFarm.nickname))) {
            handleSetActiveFarm(dedupedFarms[0]);
        } else if (dedupedFarms.length === 0) {
            handleSetActiveFarm(null);
        }
    };

    return (
        <FarmContext.Provider value={{ activeFarm, setActiveFarm: handleSetActiveFarm, farms, setFarms: handleSetFarms }}>
            {children}
        </FarmContext.Provider>
    );
};

export const useFarm = () => {
    const context = useContext(FarmContext);
    if (context === undefined) {
        throw new Error('useFarm must be used within a FarmProvider');
    }
    return context;
};
