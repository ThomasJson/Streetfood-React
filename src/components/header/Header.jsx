import React from "react";

const Header = () => {
  return (
    <>
      <div className="h-10vh bg-slate-400">

        <div className="flex sm:hidden h-full justify-center items-center">SearchBar</div>

        <div className="hidden sm:flex h-full flex-col justify-between">
          <div className="flex flex-row justify-between">
            <div>Logo</div>
            <div>SearchBar</div>
            <div>Compte</div>
            <div>Panier</div>
          </div>

          <div className="flex flex-row justify-between">
            <div>Categorie1</div>
            <div>Categorie2</div>
            <div>Categorie3</div>
            <div>Categorie4</div>
            <div>Categorie5</div>
          </div>
        </div>

      </div>
    </>
  );
};

export default Header;
