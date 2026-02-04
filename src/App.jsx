import React, { useState, useEffect } from 'react';
import { Info, Calculator, User, Instagram, Lock, Edit3, ExternalLink, BarChart3, Rocket, RefreshCw, HelpCircle, Eye, ArrowDown } from 'lucide-react';

const Card = ({ children, className = "" }) => (
  <div className={`bg-slate-900 border border-slate-800 rounded-lg p-6 shadow-xl relative overflow-hidden group ${className}`}>
    {/* Instagram Gradient Border Effect on Hover/Active */}
    <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-yellow-500 via-red-500 to-purple-600 opacity-50 group-hover:opacity-100 transition-opacity"></div>
    {children}
  </div>
);

const SectionTitle = ({ children, icon: Icon }) => (
  <h3 className="font-bold text-lg mb-4 uppercase tracking-wider flex items-center gap-2 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600">
    {Icon && <Icon className="text-pink-500" size={20} />}
    {children}
  </h3>
);

const InputRow = ({ label, subLabel, value, onChange, type = "number", suffix = "", step = "1", editable = true, extraContent = null, highlight = false }) => (
  <div className={`grid grid-cols-12 gap-4 items-center mb-3 py-2 border-b border-slate-800/50 hover:bg-slate-800/30 transition-colors rounded px-2 group ${highlight ? 'bg-slate-800/50 border-pink-500/30' : ''}`}>
    <div className="col-span-12 sm:col-span-5 text-slate-300 font-medium text-sm sm:text-base group-hover:text-white transition-colors">
      {label}
      {subLabel && <span className="block text-[10px] text-slate-500 font-normal">{subLabel}</span>}
    </div>
    <div className="col-span-8 sm:col-span-4 relative">
      {editable ? (
        <div className="relative">
          <input
            type={type}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            step={step}
            className={`w-full bg-slate-950 border ${highlight ? 'border-pink-500/50 ring-1 ring-pink-500/20' : 'border-slate-700'} text-right text-white px-3 py-1 rounded focus:border-pink-500 focus:outline-none focus:ring-1 focus:ring-pink-500 transition-all font-mono`}
          />
          {suffix && <span className="absolute right-8 top-1/2 -translate-y-1/2 text-slate-500 text-xs pointer-events-none">{suffix}</span>}
        </div>
      ) : (
        <div className="text-right text-white font-mono font-bold px-3 py-1">
          {value} {suffix}
        </div>
      )}
    </div>
    <div className="col-span-4 sm:col-span-3 flex justify-end items-center gap-2">
      {extraContent}
      {editable ? (
        <span className="inline-flex items-center gap-1 px-2 py-1 rounded bg-slate-800 border border-slate-600 text-slate-400 text-xs">
          <Edit3 size={12} /> <span className="hidden sm:inline">Editar</span>
        </span>
      ) : (
        <span className="inline-flex items-center gap-1 px-2 py-1 rounded bg-red-900/20 border border-red-900/50 text-red-400 text-xs">
          <Lock size={12} /> <span className="hidden sm:inline">Fijo</span>
        </span>
      )}
    </div>
  </div>
);

const InfoBlock = ({ title, description, metrics }) => (
  <div className="mb-8 text-sm">
    <h4 className="flex items-center gap-2 text-slate-200 font-semibold mb-2">
      <Info size={16} className="text-pink-500" /> {title}
    </h4>
    <p className="text-slate-400 mb-3 leading-relaxed text-xs sm:text-sm">
      {description}
    </p>
    <div className="bg-slate-950/80 p-3 rounded border-l-2 border-pink-500/50">
      {metrics.map((m, i) => (
        <div key={i} className="flex justify-between items-center mb-2 last:mb-0 border-b border-slate-800/50 last:border-0 pb-1 last:pb-0">
          <span className={`font-bold ${m.color}`}>{m.label}</span>
          <span className="text-slate-300 font-mono text-xs">{m.value}</span>
        </div>
      ))}
    </div>
  </div>
);

export default function App() {
  // State variables
  const [expertName, setExpertName] = useState("jacobdelvasto");
  const [followers, setFollowers] = useState(2789);
  const [interactionRate, setInteractionRate] = useState(1.42);
  
  // New: Active Reach (Defaults to calculation, but editable)
  const [activeReach, setActiveReach] = useState(40); 
  
  const [productPrice, setProductPrice] = useState(500);
  const [conversionRate, setConversionRate] = useState(2); 
  const [commissionRate, setCommissionRate] = useState(50); 
  
  // UI States
  const [isCalculated, setIsCalculated] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  // Computed values
  const [salesCount, setSalesCount] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [benefit, setBenefit] = useState(0);

  // Auto-update base calculation only when inputs change AND user hasn't manually overridden meaningfully
  // Actually, let's just provide a helper to reset it, but let user control "activeReach"
  useEffect(() => {
    // Calculo pesimista base (Engagement de Feed)
    const feedEngagement = Math.round(followers * (interactionRate / 100));
    // Si el valor actual es muy bajo o parece ser el calculo anterior, sugerimos el nuevo
    // Pero para evitar sobrescribir si el usuario puso "470", solo actualizamos si está cerca del valor matematico
    // O mejor: Lo dejamos manual y ponemos un botón "Recalcular desde SocialBlade"
  }, [followers, interactionRate]);

  // Manual Calculation Function
  const handleCalculate = () => {
    setIsAnimating(true);
    
    // Simulate calculation delay for effect
    setTimeout(() => {
      // 1. Usamos DIRECTAMENTE el "activeReach" (Vistas/Alcance) que puso el usuario
      const basePeople = activeReach;
      
      // 2. Calcular Ventas (Sales)
      const calculatedSales = Math.round(basePeople * (conversionRate / 100));
      
      // Asegurar al menos 0
      const finalSales = Math.max(0, calculatedSales);
      
      const calculatedRevenue = finalSales * productPrice;
      const calculatedBenefit = calculatedRevenue * (commissionRate / 100);
  
      setSalesCount(finalSales);
      setTotalRevenue(calculatedRevenue);
      setBenefit(calculatedBenefit);
      
      setIsCalculated(true);
      setIsAnimating(false);

      const resultsElement = document.getElementById('results-section');
      if (resultsElement) {
        resultsElement.scrollIntoView({ behavior: 'smooth' });
      }
    }, 600);
  };

  const handleReset = () => {
    setIsCalculated(false);
    setSalesCount(0);
    setTotalRevenue(0);
    setBenefit(0);
  };

  const openSocialBlade = () => {
    const username = expertName.replace('@', '').trim();
    if(username) {
      window.open(`https://socialblade.com/instagram/user/${username}`, '_blank');
    }
  };

  const syncReachFromSB = () => {
    const calc = Math.round(followers * (interactionRate / 100));
    setActiveReach(calc);
    setIsCalculated(false);
  };

  const formatCurrency = (val) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(val);
  };

  return (
    <div className="min-h-screen bg-black text-slate-200 p-4 md:p-8 font-sans selection:bg-pink-500/30">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <header className="mb-8 border-b border-slate-800 pb-6 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-600 p-2 rounded-xl">
                <Instagram className="text-white" size={28} />
              </div>
              <h1 className="text-2xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-pink-300 to-purple-400">
                Calculadora de Potencial
              </h1>
            </div>
            <p className="text-slate-500 text-sm font-mono flex items-center gap-2">
              <BarChart3 size={14} /> Herramienta para Creadores de Instagram
            </p>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Calculator Column */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Creator Data Section */}
            <Card>
              <SectionTitle icon={User}>1. Datos de SocialBlade</SectionTitle>
              
              <InputRow 
                label="Usuario (sin @)" 
                value={expertName} 
                onChange={(val) => { setExpertName(val); setIsCalculated(false); }}
                type="text"
                extraContent={
                  <button 
                    onClick={openSocialBlade}
                    className="p-1.5 bg-slate-800 hover:bg-orange-600 text-slate-300 hover:text-white rounded transition-colors"
                    title="Verificar en SocialBlade"
                  >
                    <ExternalLink size={14} />
                  </button>
                }
              />
              <InputRow 
                label="Seguidores" 
                value={followers} 
                onChange={(val) => { setFollowers(val); setIsCalculated(false); }}
                suffix="" 
              />
              <InputRow 
                label="Engagement Rate"
                subLabel="Interacción en Feed (Likes/Comments)"
                value={interactionRate} 
                onChange={(val) => { setInteractionRate(val); setIsCalculated(false); }}
                step="0.01"
                suffix="%" 
              />
              
              <div className="flex justify-end mt-2">
                <button 
                  onClick={syncReachFromSB}
                  className="text-[10px] text-slate-500 hover:text-pink-400 flex items-center gap-1 transition-colors"
                >
                  <ArrowDown size={10} /> Usar este cálculo ({Math.round(followers * (interactionRate/100))}) como base
                </button>
              </div>
            </Card>

            <Card className="border-pink-500/20 bg-slate-900/50">
              <SectionTitle icon={Eye}>2. Base de Clientes (Importante)</SectionTitle>
              
              <div className="mb-4 bg-slate-950/50 p-3 rounded border-l-2 border-yellow-500 text-xs text-yellow-500/90">
                <strong>¡Ojo!</strong> El Engagement de SocialBlade suele ser bajo. Si vendes por Stories, 
                pon aquí tus <strong>Vistas Promedio</strong> (ej: 470) para un cálculo real.
              </div>

              <InputRow 
                label="Alcance / Vistas Reales" 
                subLabel="Gente real que ve tu oferta (Base del cálculo)"
                value={activeReach} 
                onChange={(val) => { setActiveReach(val); setIsCalculated(false); }}
                suffix="pers" 
                highlight={true}
                extraContent={
                   <div className="group relative">
                    <HelpCircle size={14} className="text-pink-500 cursor-help" />
                    <div className="absolute bottom-full right-0 w-56 bg-slate-800 p-2 rounded text-[10px] text-slate-300 hidden group-hover:block z-10 shadow-lg border border-slate-700">
                      Pon aquí tus vistas de Stories. SocialBlade solo calcula likes del feed (~40 personas), pero tus stories las ven más (~470).
                    </div>
                  </div>
                }
              />
            </Card>

            <Card>
              <SectionTitle icon={Edit3}>3. Variables de Venta</SectionTitle>
              <InputRow 
                label="Precio del Producto" 
                value={productPrice} 
                onChange={(val) => { setProductPrice(val); setIsCalculated(false); }}
                suffix="$" 
              />
              <InputRow 
                label="Ratio de Conversión" 
                subLabel="% de espectadores que compran"
                value={conversionRate} 
                onChange={(val) => { setConversionRate(val); setIsCalculated(false); }}
                step="0.1"
                suffix="%" 
              />
            </Card>

            {/* ACTION BUTTON */}
            <button 
              onClick={handleCalculate}
              disabled={isAnimating}
              className={`w-full py-4 rounded-xl font-black text-lg uppercase tracking-widest shadow-lg transform transition-all active:scale-95 flex items-center justify-center gap-3
                ${isAnimating 
                  ? 'bg-slate-800 text-slate-500 cursor-wait' 
                  : 'bg-gradient-to-r from-orange-500 via-pink-600 to-purple-600 text-white hover:shadow-pink-500/25 hover:brightness-110'
                }`}
            >
              {isAnimating ? (
                <>Calculando...</>
              ) : (
                <><Rocket size={24} /> Calcular Potencial Real 🚀</>
              )}
            </button>

            {/* Results Section */}
            <div id="results-section" className={`transition-all duration-700 ${isCalculated ? 'opacity-100 translate-y-0' : 'opacity-50 translate-y-4 grayscale blur-sm pointer-events-none'}`}>
              <Card className="relative overflow-hidden">
                {isCalculated && (
                  <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-purple-600/20 via-pink-500/10 to-yellow-500/5 rounded-full blur-3xl -z-10 pointer-events-none animate-pulse"></div>
                )}

                <div className="flex justify-between items-center mb-4">
                  <SectionTitle icon={Calculator}>Tus Resultados</SectionTitle>
                  {isCalculated && (
                    <button onClick={handleReset} className="text-slate-500 hover:text-white transition-colors p-2" title="Reiniciar">
                      <RefreshCw size={16} />
                    </button>
                  )}
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-4">
                   <div className="bg-slate-950 p-3 rounded border border-slate-800">
                      <div className="text-slate-500 text-xs uppercase mb-1">Base de Clientes</div>
                      <div className="text-xl font-mono text-white">{activeReach} <span className="text-xs text-slate-600">pers.</span></div>
                   </div>
                   <div className="bg-slate-950 p-3 rounded border border-slate-800">
                      <div className="text-slate-500 text-xs uppercase mb-1">Ventas ({conversionRate}%)</div>
                      <div className="text-xl font-mono text-cyan-400">{salesCount} <span className="text-xs text-slate-600">ud.</span></div>
                   </div>
                </div>
                
                <InputRow 
                  label="Facturación Total" 
                  value={formatCurrency(totalRevenue)} 
                  editable={false} 
                />

                <div className="mt-6 pt-4 border-t border-slate-700">
                  <div className="grid grid-cols-12 gap-4 items-center px-2 py-4 rounded bg-gradient-to-r from-slate-900 to-slate-800 border border-slate-700/50 shadow-inner">
                    <div className="col-span-12 sm:col-span-5 text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600 font-black text-lg uppercase tracking-wider">
                      TU BENEFICIO (50%):
                    </div>
                    <div className="col-span-8 sm:col-span-4 text-right">
                      <span className="text-3xl font-mono font-bold text-emerald-400 drop-shadow-md">
                        {isCalculated ? formatCurrency(benefit) : "---"}
                      </span>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>

          {/* Sidebar Info Column */}
          <div className="lg:col-span-1">
            <div className="h-full border-l border-slate-800 pl-0 lg:pl-8 py-4">
              <h3 className="text-slate-400 font-bold mb-6 flex items-center gap-2 uppercase tracking-widest text-xs">
                <Info size={14} /> Entendiendo los Datos
              </h3>

              <InfoBlock 
                title="Engagement vs. Vistas"
                description="SocialBlade te da el Engagement del feed (Likes). Para vender, usa tus VISTAS DE HISTORIAS, que suelen ser mucho más altas."
                metrics={[
                  { label: "Feed (SB)", value: "~40 pers", color: "text-red-400" },
                  { label: "Stories (Tú)", value: "~470 pers", color: "text-green-400" },
                ]}
              />

              <div className="w-full h-px bg-gradient-to-r from-slate-800 via-pink-900/30 to-slate-800 my-6"></div>

              <InfoBlock 
                title="Ratio de Venta"
                description="Si 470 personas ven tu historia, ¿cuántas compran? Sé realista:"
                metrics={[
                  { label: "Pesimista (0.5%)", value: "~2 ventas", color: "text-slate-400" },
                  { label: "Realista (2%)", value: "~9 ventas", color: "text-slate-300" },
                  { label: "Optimista (5%)", value: "~23 ventas", color: "text-white" },
                ]}
              />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
