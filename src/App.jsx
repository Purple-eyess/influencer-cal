import React, { useState, useEffect } from 'react';
import { Info, Calculator, User, DollarSign, Instagram, Percent, Lock, Edit3, ExternalLink, BarChart3 } from 'lucide-react';

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

const InputRow = ({ label, value, onChange, type = "number", suffix = "", step = "1", editable = true, extraContent = null }) => (
  <div className="grid grid-cols-12 gap-4 items-center mb-3 py-2 border-b border-slate-800/50 hover:bg-slate-800/30 transition-colors rounded px-2 group">
    <div className="col-span-12 sm:col-span-5 text-slate-300 font-medium text-sm sm:text-base group-hover:text-white transition-colors">{label}:</div>
    <div className="col-span-8 sm:col-span-4 relative">
      {editable ? (
        <div className="relative">
          <input
            type={type}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            step={step}
            className="w-full bg-slate-950 border border-slate-700 text-right text-white px-3 py-1 rounded focus:border-pink-500 focus:outline-none focus:ring-1 focus:ring-pink-500 transition-all font-mono"
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
          <Edit3 size={12} /> <span className="hidden sm:inline">Editable</span>
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
  const [expertName, setExpertName] = useState("Raúl_Trainer");
  const [followers, setFollowers] = useState(20000);
  const [interactionRate, setInteractionRate] = useState(2.6);
  const [productPrice, setProductPrice] = useState(500);
  const [conversionRate, setConversionRate] = useState(10);
  const [commissionRate, setCommissionRate] = useState(50); 

  // Computed values
  const [salesCount, setSalesCount] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [benefit, setBenefit] = useState(0);

  useEffect(() => {
    const engagedUsers = followers * (interactionRate / 100);
    const calculatedSales = Math.floor(engagedUsers * (conversionRate / 100));
    const calculatedRevenue = calculatedSales * productPrice;
    const calculatedBenefit = calculatedRevenue * (commissionRate / 100);

    setSalesCount(calculatedSales);
    setTotalRevenue(calculatedRevenue);
    setBenefit(calculatedBenefit);
  }, [followers, interactionRate, productPrice, conversionRate, commissionRate]);

  // SocialBlade Link Generator
  const openSocialBlade = () => {
    // Remove @ if present
    const username = expertName.replace('@', '').trim();
    if(username) {
      window.open(`https://socialblade.com/instagram/user/${username}`, '_blank');
    }
  };

  const formatCurrency = (val) => {
    return new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(val);
  };

  return (
    <div className="min-h-screen bg-black text-slate-200 p-4 md:p-8 font-sans selection:bg-pink-500/30">
      <div className="max-w-6xl mx-auto">
        
        {/* Header with Instagram Gradient */}
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
          <div className="text-right hidden md:block">
            <span className="text-xs text-slate-600 uppercase tracking-widest">Powered by</span>
            <div className="font-bold text-slate-400">Shadow Operator</div>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Calculator Column */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Creator Data Section */}
            <Card>
              <SectionTitle icon={User}>Datos del creador</SectionTitle>
              
              <InputRow 
                label="Usuario (sin @)" 
                value={expertName} 
                onChange={setExpertName} 
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
                onChange={setFollowers} 
                suffix="" 
              />
              <InputRow 
                label="Ratio de Interacción" 
                value={interactionRate} 
                onChange={setInteractionRate} 
                step="0.1"
                suffix="%" 
              />
              <InputRow 
                label="Precio del Producto" 
                value={productPrice} 
                onChange={setProductPrice} 
                suffix="€" 
              />
            </Card>

            {/* Results Section */}
            <Card className="relative overflow-hidden">
              {/* Instagram Gradient Glow */}
              <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-purple-600/10 via-pink-500/10 to-yellow-500/5 rounded-full blur-3xl -z-10 pointer-events-none"></div>

              <SectionTitle icon={Calculator}>Resultados Estimados</SectionTitle>
              
              <InputRow 
                label="Ratio de Conversión" 
                value={conversionRate} 
                onChange={setConversionRate} 
                step="0.1"
                suffix="%" 
              />
              
              <div className="my-4 border-t border-slate-800"></div>

              <InputRow 
                label="Ventas Estimadas" 
                value={salesCount} 
                editable={false} 
              />
              
              <InputRow 
                label="Facturación Total" 
                value={formatCurrency(totalRevenue)} 
                editable={false} 
              />

              {/* Benefit Highlight Row */}
              <div className="mt-6 pt-4 border-t border-slate-700">
                <div className="grid grid-cols-12 gap-4 items-center px-2 py-2 rounded bg-gradient-to-r from-slate-900 to-slate-800 border border-slate-700/50">
                  <div className="col-span-12 sm:col-span-5 text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600 font-black text-lg uppercase tracking-wider">
                    TU BENEFICIO (50%):
                  </div>
                  <div className="col-span-8 sm:col-span-4 text-right">
                    <span className="text-2xl font-mono font-bold text-emerald-400 drop-shadow-md">
                      {formatCurrency(benefit)}
                    </span>
                  </div>
                  <div className="col-span-4 sm:col-span-3 flex justify-end">
                     <span className="inline-flex items-center gap-1 px-2 py-1 rounded bg-slate-950 border border-slate-700 text-slate-500 text-xs">
                      <Lock size={12} /> Calculado
                    </span>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Sidebar Info Column */}
          <div className="lg:col-span-1">
            <div className="h-full border-l border-slate-800 pl-0 lg:pl-8 py-4">
              <h3 className="text-slate-400 font-bold mb-6 flex items-center gap-2 uppercase tracking-widest text-xs">
                <Info size={14} /> Guía de Métricas
              </h3>

              {/* Updated Engagement Metrics based on image */}
              <InfoBlock 
                title="Ratio de Engagement"
                description="Calidad de interacción según SocialBlade."
                metrics={[
                  { label: "Bajo (1%)", value: "Pobre", color: "text-red-500" },
                  { label: "Medio (1-3%)", value: "Aceptable", color: "text-orange-400" },
                  { label: "Fuerte (3-5%)", value: "Bueno", color: "text-green-500" },
                  { label: "Excepcional (5%+)", value: "Excelente", color: "text-cyan-400" },
                ]}
              />

              <div className="w-full h-px bg-gradient-to-r from-slate-800 via-pink-900/30 to-slate-800 my-6"></div>

              <InfoBlock 
                title="Ratio de Conversión"
                description="Porcentaje de venta según confianza y oferta."
                metrics={[
                  { label: "Bajo (1-5%)", value: "Frío", color: "text-slate-400" },
                  { label: "Medio (5-10%)", value: "Templado", color: "text-slate-300" },
                  { label: "Alto (10%+)", value: "Caliente", color: "text-white" },
                ]}
              />

              <div className="mt-8 p-4 bg-slate-900 rounded-lg border border-slate-800 text-center">
                <p className="text-xs text-slate-500 mb-2">¿Necesitas verificar datos?</p>
                <button 
                  onClick={openSocialBlade}
                  className="w-full py-2 px-4 rounded bg-gradient-to-r from-orange-500 via-pink-600 to-purple-600 text-white font-bold text-sm hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                >
                  <BarChart3 size={16} /> Consultar SocialBlade
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
