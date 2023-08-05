"use client";
import { useState, useEffect } from "react";
import { CategoryValue } from "@/models/category";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "./ui/button";
import { usePathname } from "next/navigation";
import axios from "axios";

interface SearchFormProps {
  values: CategoryValue[];
}

const SearchForm: React.FC<SearchFormProps> = ({ values }) => {
  const [search, setSearch] = useState<CategoryValue[]>([]);
  const pathname = usePathname();

  useEffect(() => {
    const data: CategoryValue[] = values.map((obj) => ({
      name: obj.name,
      values: [],
    }));
    setSearch(data);
  }, [values]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(pathname);
    const [, categorypath, searchpath] = pathname.split("/");
    const query = {
      category: categorypath,
      search: searchpath,
      parameters: search,
    };
    console.log(query);
    try {
      console.log("sending");
      await axios.post("/api/productFilter", query);
      console.log("sent");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col space-y-4">
        <Button className="w-min" type="submit">
          Search
        </Button>
        {values.map((obj, objindex) => (
          <div className="space-y-3" key={objindex}>
            <Label className="text-xl font-bold">{obj.name}</Label>
            <div className="flex flex-col space-y-3">
              {obj.values.map((value, valindex) => (
                <div key={valindex} className="flex items-center gap-2">
                  <Checkbox
                    className="text-lg"
                    checked={search[objindex]?.values?.includes(value)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setSearch((prev) => {
                          const data = [...prev];
                          data[objindex].values.push(value);
                          return data;
                        });
                      } else {
                        setSearch((prev) => {
                          const data = [...prev];
                          data[objindex].values = data[objindex].values.filter(
                            (val) => val !== value
                          );
                          return data;
                        });
                      }
                    }}
                  />
                  <Label className="text-md">{value}</Label>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </form>
  );
};

export default SearchForm;
