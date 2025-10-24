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
import { Separator } from "./ui/separator";
import { Alert, AlertDescription } from "./ui/alert";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";

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

  // --- Data Fetching and Initialization (Kept as-is for functionality) ---

  useEffect(() => {
    const fetchPriceList = async () => {
      if (!priceList.length) {
        // Mock API call to get/set price list
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
          // Select the first month/price by default
          const [firstMonthKey, firstMonthValue] = Object.entries(foundItem.plans)[0];
          setChosenMonth(firstMonthKey);
          setSelectedMonth(firstMonthValue);
        }
      }
    };

    if (priceList.length === 0) {
      fetchPriceList();
    } else if (!details) {
      findItemInList();
    }
  }, [priceList, object, setPriceListAll]);

  // --- Cart Position Setup (Kept as-is for animation) ---
  useEffect(() => {
    const updateCartPosition = () => {
      const cartIcon = document.getElementById('cart-icon');
      if (cartIcon) {
        const rect = cartIcon.getBoundingClientRect();
        setCartPosition({
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2
        });
      }
    };

    updateCartPosition(); // Initial position
    window.addEventListener('resize', updateCartPosition);
    return () => window.removeEventListener('resize', updateCartPosition);
  }, [details]);


  const handleMonthClick = (key, value) => {
    setChosenMonth(key);
    setSelectedMonth(value);
  };

  const handleDeviceChange = (num) => setSelectedDevice(`${num}`);

  const totalCost = parseInt(selectedMonth) * parseInt(selectedDevice);

  // --- Add to Cart Logic (Kept as-is for functionality) ---
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

  if (!details) return <PriceDetailsShimmer />;

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 transition-colors duration-300">
      <div className="container mx-auto px-4 py-8 lg:py-12 max-w-7xl">
        {/* Main Product Section */}
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-10">
          
          {/* Image Card (More subtle shadow, better aspect ratio for mobile) */}
          <Card className="overflow-hidden border-slate-200 dark:border-slate-800 shadow-md lg:shadow-xl">
            <CardContent className="p-0">
              <div className="relative aspect-[4/3] sm:aspect-square bg-slate-100 dark:bg-slate-900 flex items-center justify-center">
                <div className="absolute top-4 right-4 z-10">
                  <Badge variant="secondary" className="bg-white/90 dark:bg-slate-950/90 shadow-lg text-sm font-medium border-0">
                    <Sparkles className="w-3.5 h-3.5 mr-1 text-yellow-500" />
                    {details.plans ? "Premium Access" : "Exclusive"}
                  </Badge>
                </div>
                <img
                  className="w-full h-full object-contain p-6 sm:p-12 md:p-16 lg:p-20"
                  src={details.ImageId || "/api/placeholder/600/600"}
                  alt={details.Name}
                />
              </div>
            </CardContent>
          </Card>

          {/* Product Details & Selection Card */}
          <Card className="border-slate-200 dark:border-slate-800 shadow-md lg:shadow-xl p-4">
            <CardHeader className="space-y-1 pb-4 border-b dark:border-slate-800">
              <div className="flex items-start justify-between">
                <div className="space-y-1 flex-1">
                  <CardTitle className="text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                    {details.Name}
                  </CardTitle>
                  <CardDescription className="text-base text-slate-600 dark:text-slate-400">
                    {details.Info}
                  </CardDescription>
                </div>
                {/* Cart Icon - Slightly larger and more visible */}
                {/* <div id="cart-icon" className="ml-4 flex-shrink-0">
                  <div className="relative p-3 rounded-full bg-slate-100 dark:bg-slate-800 border dark:border-slate-700">
                    <ShoppingCart className="w-5 h-5 text-slate-600 dark:text-slate-400" />
                    {animatingItem && (
                      <span className="absolute -top-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-sm font-bold text-white shadow-xl animate-pulse">
                        +1
                      </span>
                    )}
                  </div>
                </div> */}
              </div>
            </CardHeader>

            <CardContent className="space-y-6 pt-6">
              {details.plans ? (
                <>
                  
                  {/* Duration Selection (Improved visual feedback & price display) */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                      <h3 className="text-md font-bold text-slate-800 dark:text-slate-200">
                        Select Duration
                      </h3>
                    </div>
                    {/* Responsive Grid: 2 columns on mobile, 3 on larger screens */}
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {monthOptions.map(([key, value]) => (
                        <Button
                          key={key}
                          variant={selectedMonth === value ? "default" : "outline"}
                          className={`h-auto py-4 flex-col gap-1 border-2 transition-all duration-200 ${
                            selectedMonth === value 
                              ? "bg-blue-600 hover:bg-blue-700 text-white border-blue-600 shadow-lg shadow-blue-500/30 transform scale-[1.02]" 
                              : "hover:bg-slate-50 dark:hover:bg-slate-800/80 dark:border-slate-700 text-slate-700 dark:text-slate-300"
                          }`}
                          onClick={() => handleMonthClick(key, value)}
                        >
                          <span className="text-base font-bold">{key}</span>
                          <span className="text-sm opacity-90">NPR {value}</span>
                        </Button>
                      ))}
                    </div>
                  </div>

                  <Separator />

                  {/* Device Selection (Slightly larger buttons) */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Package className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                      <h3 className="text-md font-bold text-slate-800 dark:text-slate-200">
                        Number of Users / Devices
                      </h3>
                    </div>
                    {/* Responsive Grid: 3 columns */}
                    <div className="grid grid-cols-3 gap-3">
                      {deviceOptions.map((num) => (
                        <Button
                          key={num}
                          variant={selectedDevice === `${num}` ? "default" : "outline"}
                          className={`h-auto py-4 text-lg font-bold border-2 transition-all duration-200 ${
                            selectedDevice === `${num}`
                              ? "bg-blue-600 hover:bg-blue-700 text-white border-blue-600 shadow-lg shadow-blue-500/30 transform scale-[1.02]"
                              : "hover:bg-slate-50 dark:hover:bg-slate-800/80 dark:border-slate-700 text-slate-700 dark:text-slate-300"
                          }`}
                          onClick={() => handleDeviceChange(num)}
                        >
                          {num}
                        </Button>
                      ))}
                    </div>
                  </div>

                  <Separator />

                  {/* Price Summary (More attention-grabbing) */}
                  <div className="p-5 bg-gradient-to-r from-teal-50 to-emerald-50 dark:from-slate-800 dark:to-slate-800/70 rounded-xl border border-emerald-300 dark:border-emerald-800 shadow-inner">
                    <div className="flex items-center justify-between">
                      <span className="text-base font-medium text-slate-700 dark:text-slate-300">
                        Total Cost:
                      </span>
                      <div className="flex items-baseline gap-1">
                        <span className="text-4xl font-extrabold text-emerald-600 dark:text-emerald-400">
                          NPR {totalCost.toLocaleString()}
                        </span>
                      </div>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
                      **Based on your selection of: <span className="font-semibold">{selectedDevice} device{selectedDevice !== "1" ? "s" : ""}</span> for <span className="font-semibold">{chosenMonth}</span>
                    </p>
                  </div>

                  {/* Add to Cart Button (Highly visible, full-width) */}
                  <Button
                    onClick={addItemToCart}
                    disabled={isAdded}
                    className={`w-full h-14 text-lg font-bold transition-all duration-300 rounded-lg ${
                      isAdded 
                        ? "bg-emerald-600 hover:bg-emerald-600 shadow-xl shadow-emerald-500/50" 
                        : "bg-blue-600 hover:bg-blue-700 shadow-xl shadow-blue-500/50 hover:shadow-2xl hover:shadow-blue-500/70"
                    }`}
                  >
                    {isAdded ? (
                      <>
                        <Check className="w-5 h-5 mr-3 animate-pulse" />
                        Added to Cart!
                      </>
                    ) : (
                      <>
                        <ShoppingCart className="w-5 h-5 mr-3" />
                        Add to Cart
                      </>
                    )}
                  </Button>
                  
                  {/* Flying animation item */}
                  {animatingItem && (
                    <div 
                      className="fixed z-[100] h-10 w-10 rounded-full bg-emerald-500 flex items-center justify-center text-white shadow-2xl shadow-emerald-500/70 pointer-events-none"
                      style={{
                        left: `${animatingItem.startX - 20}px`, /* Adjust for 10px radius */
                        top: `${animatingItem.startY - 20}px`, /* Adjust for 10px radius */
                        animation: "fly-to-cart 0.9s cubic-bezier(0.65, 0, 0.35, 1) forwards"
                      }}
                    >
                      <Plus className="w-5 h-5" />
                    </div>
                  )}
                </>
              ) : (
                <Alert className="border-blue-300 dark:border-blue-700 bg-blue-50 dark:bg-blue-950/30">
                  <ArrowUpRight className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  <AlertDescription className="text-blue-800 dark:text-blue-200 text-base">
                    <span className="font-semibold">Pricing Not Available:</span> Please contact our admin team for pricing and availability of this item.
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>
        </div>

        <Separator className="my-10 dark:bg-slate-800" />

        {/* FAQ Section (Improved Title) */}
        {/* <Card className="mb-6 border-slate-200 dark:border-slate-800 shadow-md lg:shadow-xl">
          <CardHeader className="border-b dark:border-slate-800 pb-4">
            <CardTitle className="text-2xl font-bold text-slate-800 dark:text-white">
              <Check className="w-5 h-5 mr-2 inline text-blue-600" />
              Frequently Asked Questions
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <FAQ chosenMonth={chosenMonth} details={details} />
          </CardContent>
        </Card> */}

        {/* Comments Section (More visual appeal) */}
        {/* <Card className="border-slate-200 dark:border-slate-800 shadow-md lg:shadow-xl">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-slate-800 dark:text-white">Customer Reviews</CardTitle>
            <CardDescription>Share your thoughts about this product</CardDescription>
          </CardHeader>
          <CardContent>
            <Alert className="border-amber-300 dark:border-amber-700 bg-amber-50 dark:bg-amber-950/30">
              <Sparkles className="h-5 w-5 text-amber-600 dark:text-amber-400" />
              <AlertDescription>
                <span className="font-extrabold text-amber-900 dark:text-amber-100 text-base">Reviews Coming Soon!</span>
                <p className="text-amber-800 dark:text-amber-200 text-sm mt-1">
                  We're excited to launch our new review system to help you shop better. Stay tuned!
                </p>
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card> */}
      </div>

      {/* Global Style for Animation (Using better cubic-bezier for a smoother 'launch' effect) */}
      <style global jsx>{`
        @keyframes fly-to-cart {
          0% {
            transform: scale(1) translateY(0) translateZ(0);
            opacity: 1;
          }
          30% {
            transform: scale(1.1) translateY(-30px) translateZ(10px); /* Add a slight lift */
          }
          100% {
            transform: scale(0.1) translateX(${animatingItem ? (cartPosition.x - animatingItem.startX + 20) : 0}px) 
                       translateY(${animatingItem ? (cartPosition.y - animatingItem.startY + 20) : 0}px) 
                       translateZ(0);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default PriceDetails;