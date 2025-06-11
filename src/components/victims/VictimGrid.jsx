import React from "react";
import VictimCard from "./VictimCard.jsx";

const VictimGrid = ({ victims }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {victims && victims.length > 0 ? (
                victims.map((victim) => (
                    <VictimCard key={victim._id} victim={victim} />
                ))
            ) : (
                <p className="text-gray-500 col-span-full text-center">No victims found.</p>
            )}
        </div>
    );
};

export default VictimGrid;
