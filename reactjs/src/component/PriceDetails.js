import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { Pricelist as PriceListMock } from "../const";
import { useDispatch } from "react-redux";
import { addItem } from "../Const/cartslice";
import FAQ from "./small component/FAQ";
import { priceUpdate } from "../helper/priceUpdate";
import { PriceDetailsShimmer } from "../import";
import { ShoppingCart, Check, Plus, ArrowUpRight, Package, Clock, Sparkles } from "lucide-react";
import { MyContext } from "../App";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "../components/ui/badge";
import { Separator } from "../components/ui/separator";
import { Button } from "./ui/button";
import { Alert, AlertDescription } from "../components/ui/alert";


export const PriceDetails = () => {
  const dispatch = useDispatch();
  const { object } = useParams();
  const { priceListAll, setPriceListAll } = useContext(MyContext);

  const [details, setDetails] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedDevice, setSelectedDevice] = useState("1");
  const [chosenMonth, setChosenMonth] = useState(null);
  const [priceList, setPriceList] = useState(priceListAll || []);
  const [isAdded, setIsAdded] = useState(false);
  const [animatingItem, setAnimatingItem] = useState(null);
  const [cartPosition, setCartPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const fetchPriceList = async () => {
      if (!priceList.length) {
        const apiData = await priceUpdate(PriceListMock);
        setPriceListAll(apiData);
        setPriceList(apiData);
      }
    };

    const findItemInList = () => {
      const foundItem = priceList.find((item) => item.Name === object);
      if (foundItem) {
        setDetails(foundItem);
        if (foundItem.plans) {
          const [firstMonthKey, firstMonthValue] = Object.entries(foundItem.plans)[0];
          setChosenMonth(firstMonthKey);
          setSelectedMonth(firstMonthValue);
        }
      }
    };

    if (!details) {
      fetchPriceList().then(findItemInList);
    }
  }, [priceList, object, details, setPriceListAll]);

  useEffect(() => {
    const cartIcon = document.getElementById('cart-icon');
    if (cartIcon) {
      const rect = cartIcon.getBoundingClientRect();
      setCartPosition({
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2
      });
    }

    const handleResize = () => {
      if (cartIcon) {
        const rect = cartIcon.getBoundingClientRect();
        setCartPosition({
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2
        });
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [details]);

  const handleMonthClick = (key, value) => {
    setChosenMonth(key);
    setSelectedMonth(value);
  };

  const handleDeviceChange = (num) => setSelectedDevice(`${num}`);

  const totalCost = parseInt(selectedMonth) * parseInt(selectedDevice);

  const addItemToCart = (e) => {
    if (!details) return;

    const { Id, Name, ImageId } = details;
    dispatch(
      addItem({
        Id,
        name: Name,
        selectedMonth,
        selectedDevice,
        chosenMonth,
        image: ImageId,
        cost: totalCost,
      })
    );

    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();
    const buttonX = rect.left + rect.width / 2;
    const buttonY = rect.top + rect.height / 2;
    
    setAnimatingItem({ 
      startX: buttonX, 
      startY: buttonY,
      endX: cartPosition.x,
      endY: cartPosition.y
    });
    
    setIsAdded(true);
    
    setTimeout(() => {
      setIsAdded(false);
      setAnimatingItem(null);
    }, 2000);
  };

  const monthOptions = details?.plans ? Object.entries(details.plans) : [];
  const deviceOptions = [1, 2, 3];

  console.log(chosenMonth);

  if (!details) return <PriceDetailsShimmer />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 transition-colors duration-300">
      <div className="container mx-auto px-4 py-6 lg:py-8 max-w-7xl">
        {/* Main Product Section */}
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-8 mb-6">
          {/* Image Card */}
          <Card className="overflow-hidden border-slate-200 dark:border-slate-800 shadow-xl">
            <CardContent className="p-0">
              <div className="relative aspect-square bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-900 dark:to-slate-800">
                <div className="absolute top-4 right-4 z-10">
                  <Badge variant="secondary" className="backdrop-blur-sm bg-white/90 dark:bg-slate-950/90 shadow-lg">
                    <Sparkles className="w-3 h-3 mr-1" />
                    Premium
                  </Badge>
                </div>
                <img
                  className="w-full h-full object-contain p-8"
                  src={details.ImageId || "/api/placeholder/600/600"}
                  alt={details.Name}
                  // onError={(e) => {
                  //   e.target.onerror = null;
                  //   e.target.src = "/api/placeholder/600/600";
                  // }}
                />
              </div>
            </CardContent>
          </Card>

          {/* Product Details Card */}
          <Card className="border-slate-200 dark:border-slate-800 shadow-xl">
            <CardHeader className="space-y-1 pb-4">
              <div className="flex items-start justify-between">
                <div className="space-y-2 flex-1">
                  <CardTitle className="text-2xl lg:text-3xl font-bold tracking-tight">
                    {details.Name}
                  </CardTitle>
                  <CardDescription className="text-base">
                    {details.Info}
                  </CardDescription>
                </div>
                <div id="cart-icon" className="ml-4">
                  <div className="relative p-2 rounded-full bg-slate-100 dark:bg-slate-800">
                    <ShoppingCart className="w-5 h-5 text-slate-600 dark:text-slate-400" />
                    {animatingItem && (
                      <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500 text-xs font-semibold text-white animate-pulse shadow-lg">
                        +1
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-6">
              {details.plans ? (
                <>
                  <Separator />
                  
                  {/* Duration Selection */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                      <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                        Select Duration
                      </h3>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      {monthOptions.map(([key, value]) => (
                        <Button
                          key={key}
                          variant={selectedMonth === value ? "default" : "outline"}
                          className={`h-auto py-3 flex-col gap-1 ${
                            selectedMonth === value 
                              ? "bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-500/50" 
                              : "hover:bg-slate-100 dark:hover:bg-slate-800"
                          }`}
                          onClick={() => handleMonthClick(key, value)}
                        >
                          <span className="text-sm font-semibold">{key}</span>
                          <span className="text-xs opacity-80">NPR {value}</span>
                        </Button>
                      ))}
                    </div>
                  </div>

                  <Separator />

                  {/* Device Selection */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Package className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                      <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                        Number of Devices
                      </h3>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      {deviceOptions.map((num) => (
                        <Button
                          key={num}
                          variant={selectedDevice === `${num}` ? "default" : "outline"}
                          className={`h-auto py-3 ${
                            selectedDevice === `${num}`
                              ? "bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-500/50"
                              : "hover:bg-slate-100 dark:hover:bg-slate-800"
                          }`}
                          onClick={() => handleDeviceChange(num)}
                        >
                          <span className="text-lg font-bold">{num}</span>
                        </Button>
                      ))}
                    </div>
                  </div>

                  <Separator />

                  {/* Price Summary */}
                  <div className="rounded-lg bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/30 p-4 border border-emerald-200 dark:border-emerald-800">
                    <div className="flex items-baseline justify-between">
                      <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
                        Total Cost
                      </span>
                      <div className="flex items-baseline gap-1">
                        <span className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">
                          NPR {totalCost.toLocaleString()}
                        </span>
                      </div>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                      {selectedDevice} device{selectedDevice !== "1" ? "s" : ""} × {chosenMonth}
                    </p>
                  </div>

                  {/* Add to Cart Button */}
                  <Button
                    onClick={addItemToCart}
                    disabled={isAdded}
                    className={`w-full h-12 text-base font-semibold transition-all duration-300 ${
                      isAdded 
                        ? "bg-emerald-600 hover:bg-emerald-600 shadow-lg shadow-emerald-500/50" 
                        : "bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-500/50 hover:shadow-xl hover:shadow-blue-500/60"
                    }`}
                  >
                    {isAdded ? (
                      <>
                        <Check className="w-5 h-5 mr-2 animate-bounce" />
                        Added to Cart!
                      </>
                    ) : (
                      <>
                        <ShoppingCart className="w-5 h-5 mr-2" />
                        Add to Cart
                      </>
                    )}
                  </Button>
                  
                  {/* Flying animation */}
                  {animatingItem && (
                    <div 
                      className="fixed z-50 h-12 w-12 rounded-full bg-emerald-500 flex items-center justify-center text-white shadow-xl shadow-emerald-500/50 pointer-events-none"
                      style={{
                        left: `${animatingItem.startX}px`,
                        top: `${animatingItem.startY}px`,
                        animation: "fly-to-cart 0.8s cubic-bezier(0.19, 1, 0.22, 1) forwards"
                      }}
                    >
                      <Plus className="w-6 h-6" />
                    </div>
                  )}
                </>
              ) : (
                <Alert className="border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-950/30">
                  <ArrowUpRight className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  <AlertDescription className="text-blue-800 dark:text-blue-200">
                    Please contact our admin team for pricing and availability of this item.
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>
        </div>

        {/* FAQ Section */}
        <Card className="mb-6 border-slate-200 dark:border-slate-800 shadow-xl">
          <CardHeader>
            <CardTitle className="text-xl">Frequently Asked Questions</CardTitle>
          </CardHeader>
          <CardContent>
            <FAQ chosenMonth={chosenMonth} details={details} />
          </CardContent>
        </Card>

        {/* Comments Section */}
        <Card className="border-slate-200 dark:border-slate-800 shadow-xl">
          <CardHeader>
            <CardTitle className="text-xl">Customer Reviews</CardTitle>
            <CardDescription>Share your thoughts about this product</CardDescription>
          </CardHeader>
          <CardContent>
            <Alert className="border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-950/30">
              <Sparkles className="h-4 w-4 text-amber-600 dark:text-amber-400" />
              <AlertDescription>
                <span className="font-semibold text-amber-900 dark:text-amber-100">Coming Soon!</span>
                <p className="text-amber-800 dark:text-amber-200 text-sm mt-1">
                  We're working on bringing you an amazing review system. Stay tuned!
                </p>
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>
      </div>

      <style>{`
        @keyframes fly-to-cart {
          0% {
            transform: scale(1) translateY(0);
            opacity: 1;
          }
          20% {
            transform: scale(1.2) translateY(-20px);
          }
          100% {
            transform: scale(0.3) translateX(${animatingItem ? (cartPosition.x - animatingItem.startX) : 0}px) 
                       translateY(${animatingItem ? (cartPosition.y - animatingItem.startY) : 0}px);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default PriceDetails;