import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Download, Printer, Camera, X } from "lucide-react";

/**
 * Design Philosophy: Professional Technical Form
 * - Clean, structured layout with clear visual hierarchy
 * - Corporate styling with Supergasbras branding
 * - Table-based layout for form organization
 * - Print-friendly design that matches the original document
 */

interface FormData {
  data: string;
  unidade: string;
  novoCliente: boolean;
  asBuild: boolean;
  adequacao: boolean;
  razaoSocial: string;
  nome: string;
  contato: string;
  clienteSA: string;
  clienteART: string;
  clienteRazaoSocial: string;
  clienteEndereco: string;
  clienteCidade: string;
  clienteBairro: string;
  clienteCEP: string;
  observacoes: string;
  fotos: {
    foto1: string | null;
    foto2: string | null;
    foto3: string | null;
    foto4: string | null;
  };
  // Formulário de visita
  centralProntaAcordo: string;
  alvenariaDetalhes: string;
  tanqueEnviado: string;
  redesExistentes: string;
  redesAlterarQuantidade: string;
  caminhoSuperGasbras: string;
  centralPossuidor: string;
  sinalCelular: string;
  operadora: string;
  wifi: string;
  observacoesVisita: string;
  // Avaliação de quantitativo
  quantidadeTanques: string;
  bitolaMediagemRede: string;
  quantidadePontos: string;
  quantidadeTipoAbrigo: string;
  ladeAbrigo: string;
  pressao: string;
  // OBS
  obsLogistica: string;
  obsMontagem: string;
  // Ações
  acoesCliente: string;
  acoesSuperGasbras: string;
  // Assinatura
  assinaturaCPQ: string;
  assinaturaNome: string;
}

export default function Home() {
  const formRef = useRef<HTMLDivElement>(null);
  const fileInputRefs = useRef<{ [key: string]: HTMLInputElement | null }>({});
  
  const [formData, setFormData] = useState<FormData>({
    data: "04/02/2026",
    unidade: "Manuá - SP",
    novoCliente: true,
    asBuild: false,
    adequacao: false,
    razaoSocial: "BR COSTA ENGENHARIA – BRUNO RAFAEL DE OLIVEIRA COSTA LTDA",
    nome: "Bruno Costa",
    contato: "(11) 92144-4173",
    clienteSA: "261628",
    clienteART: "2620260234523",
    clienteRazaoSocial: "CHEF EVENTOS E GASTRONOMIA LTDA",
    clienteEndereco: "RUA SALOMÃO WAINBERG, Nº146",
    clienteCidade: "SAO PAULO – SP",
    clienteBairro: "JARDIM COLOMBO",
    clienteCEP: "05628-030",
    observacoes: "",
    fotos: {
      foto1: null,
      foto2: null,
      foto3: null,
      foto4: null,
    },
    centralProntaAcordo: "sim",
    alvenariaDetalhes: "sim",
    tanqueEnviado: "sim",
    redesExistentes: "sim",
    redesAlterarQuantidade: "nao",
    caminhoSuperGasbras: "sim",
    centralPossuidor: "sim",
    sinalCelular: "sim",
    operadora: "",
    wifi: "nao",
    observacoesVisita: "",
    quantidadeTanques: "",
    bitolaMediagemRede: "",
    quantidadePontos: "",
    quantidadeTipoAbrigo: "",
    ladeAbrigo: "",
    pressao: "",
    obsLogistica: "",
    obsMontagem: "",
    acoesCliente: "",
    acoesSuperGasbras: "",
    assinaturaCPQ: "",
    assinaturaNome: "",
  });

  const handleInputChange = (field: keyof FormData, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleCheckboxChange = (field: keyof FormData) => {
    setFormData((prev) => ({
      ...prev,
      [field]: !prev[field as keyof typeof prev],
    }));
  };

  const handleImageUpload = (fotoKey: string, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFormData((prev) => ({
          ...prev,
          fotos: {
            ...prev.fotos,
            [fotoKey]: e.target?.result as string,
          },
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = (fotoKey: string) => {
    setFormData((prev) => ({
      ...prev,
      fotos: {
        ...prev.fotos,
        [fotoKey]: null,
      },
    }));
    if (fileInputRefs.current[fotoKey]) {
      fileInputRefs.current[fotoKey]!.value = "";
    }
  };

  const exportToPDF = () => {
    if (formRef.current) {
      const printWindow = window.open("", "", "width=800,height=600");
      if (printWindow) {
        printWindow.document.write(formRef.current.innerHTML);
        printWindow.document.close();
        printWindow.print();
      }
    }
  };

  const downloadAsHTML = () => {
    if (!formRef.current) return;

    const htmlContent = formRef.current.innerHTML;
    const fullHTML = `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Levantamento Técnico</title>
  <style>
    body { font-family: Arial, sans-serif; margin: 0; padding: 20px; background-color: #f5f5f5; }
    .form-container { background: white; border: 2px solid #000; max-width: 900px; margin: 0 auto; }
    table { width: 100%; border-collapse: collapse; }
    td, th { border: 1px solid #999; padding: 8px; text-align: left; }
    @media print { body { background-color: white; padding: 0; } }
  </style>
</head>
<body>
  <div class="form-container">
    ${htmlContent}
  </div>
</body>
</html>
    `;

    const blob = new Blob([fullHTML], { type: "text/html" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "levantamento-tecnico.html";
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header with Export Button */}
        <div className="mb-6 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">
            Registro de Projeto - Levantamento Técnico
          </h1>
          <div className="flex gap-3">
            <Button
              onClick={exportToPDF}
              className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2"
            >
              <Printer size={20} />
              Imprimir/PDF
            </Button>
            <Button
              onClick={downloadAsHTML}
              className="bg-green-600 hover:bg-green-700 text-white flex items-center gap-2"
            >
              <Download size={20} />
              Download
            </Button>
          </div>
        </div>

        {/* Form Container */}
        <div
          ref={formRef}
          className="bg-white border-2 border-gray-900 shadow-lg print:shadow-none"
        >
          {/* Header Section */}
          <div className="border-b-2 border-gray-900">
            <div className="grid grid-cols-3 min-h-[120px]">
              <div className="border-r-2 border-gray-900 p-4 flex flex-col items-center justify-center bg-gray-100">
                <div className="text-5xl font-bold text-red-600 mb-2">⊙</div>
                <div className="text-center font-bold text-gray-900 text-lg">
                  SUPERGASBRAS
                </div>
              </div>

              <div className="border-r-2 border-gray-900 p-4 flex flex-col items-center justify-center">
                <h2 className="text-center font-bold text-base text-gray-900">
                  REGISTRO DE PROJETO - LEVANTAMENTO TÉCNICO
                </h2>
              </div>

              <div className="p-4 flex flex-col justify-center bg-gray-100">
                <div className="mb-4">
                  <label className="text-xs font-semibold text-gray-700 block mb-1">
                    Data:
                  </label>
                  <Input
                    type="text"
                    value={formData.data}
                    onChange={(e) => handleInputChange("data", e.target.value)}
                    className="border-gray-300 text-sm"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-700 block mb-1">
                    Unidade:
                  </label>
                  <Input
                    type="text"
                    value={formData.unidade}
                    onChange={(e) =>
                      handleInputChange("unidade", e.target.value)
                    }
                    className="border-gray-300 text-sm"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Checkboxes Section */}
          <div className="border-b-2 border-gray-900 p-4">
            <div className="grid grid-cols-3 gap-6">
              <div className="flex items-center space-x-3">
                <Checkbox
                  checked={formData.novoCliente}
                  onCheckedChange={() =>
                    handleCheckboxChange("novoCliente")
                  }
                  className="w-5 h-5"
                />
                <label className="text-xs font-semibold text-gray-900 cursor-pointer">
                  NOVO CLIENTE
                </label>
              </div>
              <div className="flex items-center space-x-3">
                <Checkbox
                  checked={formData.asBuild}
                  onCheckedChange={() => handleCheckboxChange("asBuild")}
                  className="w-5 h-5"
                />
                <label className="text-xs font-semibold text-gray-900 cursor-pointer">
                  AS BUILT
                </label>
              </div>
              <div className="flex items-center space-x-3">
                <Checkbox
                  checked={formData.adequacao}
                  onCheckedChange={() => handleCheckboxChange("adequacao")}
                  className="w-5 h-5"
                />
                <label className="text-xs font-semibold text-gray-900 cursor-pointer">
                  ADEQUAÇÃO
                </label>
              </div>
            </div>
          </div>

          {/* Dados do Projetista Section */}
          <div className="border-b-2 border-gray-900">
            <div className="bg-green-100 border-b border-gray-900 p-3">
              <h3 className="font-bold text-gray-900 text-sm">
                DADOS DO PROJETISTA
              </h3>
            </div>

            <div className="border-b border-gray-300 p-3">
              <label className="text-xs font-semibold text-gray-700 block mb-2">
                RAZÃO SOCIAL:
              </label>
              <Input
                type="text"
                value={formData.razaoSocial}
                onChange={(e) =>
                  handleInputChange("razaoSocial", e.target.value)
                }
                className="border-gray-300 text-sm"
              />
            </div>

            <div className="border-b border-gray-300 p-3">
              <label className="text-xs font-semibold text-gray-700 block mb-2">
                NOME:
              </label>
              <Input
                type="text"
                value={formData.nome}
                onChange={(e) => handleInputChange("nome", e.target.value)}
                className="border-gray-300 text-sm"
              />
            </div>

            <div className="p-3">
              <label className="text-xs font-semibold text-gray-700 block mb-2">
                CONTATO:
              </label>
              <Input
                type="text"
                value={formData.contato}
                onChange={(e) => handleInputChange("contato", e.target.value)}
                className="border-gray-300 text-sm"
              />
            </div>
          </div>

          {/* Dados Cliente Section */}
          <div className="border-b-2 border-gray-900">
            <div className="bg-green-100 border-b border-gray-900 p-3">
              <div className="grid grid-cols-3 gap-4">
                <h3 className="font-bold text-gray-900 text-sm">DADOS CLIENTE</h3>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-gray-900 text-sm">SA-</span>
                  <Input
                    type="text"
                    value={formData.clienteSA}
                    onChange={(e) =>
                      handleInputChange("clienteSA", e.target.value)
                    }
                    className="border-gray-300 text-sm w-32"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-gray-900 text-sm">ART:</span>
                  <Input
                    type="text"
                    value={formData.clienteART}
                    onChange={(e) =>
                      handleInputChange("clienteART", e.target.value)
                    }
                    className="border-gray-300 text-sm"
                  />
                </div>
              </div>
            </div>

            <div className="border-b border-gray-300 p-3">
              <label className="text-xs font-semibold text-gray-700 block mb-2">
                RAZÃO SOCIAL:
              </label>
              <Input
                type="text"
                value={formData.clienteRazaoSocial}
                onChange={(e) =>
                  handleInputChange("clienteRazaoSocial", e.target.value)
                }
                className="border-gray-300 text-sm"
              />
            </div>

            <div className="border-b border-gray-300 p-3">
              <label className="text-xs font-semibold text-gray-700 block mb-2">
                ENDEREÇO:
              </label>
              <Input
                type="text"
                value={formData.clienteEndereco}
                onChange={(e) =>
                  handleInputChange("clienteEndereco", e.target.value)
                }
                className="border-gray-300 text-sm"
              />
            </div>

            <div className="p-3">
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="text-xs font-semibold text-gray-700 block mb-2">
                    CIDADE:
                  </label>
                  <Input
                    type="text"
                    value={formData.clienteCidade}
                    onChange={(e) =>
                      handleInputChange("clienteCidade", e.target.value)
                    }
                    className="border-gray-300 text-sm"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-700 block mb-2">
                    BAIRRO:
                  </label>
                  <Input
                    type="text"
                    value={formData.clienteBairro}
                    onChange={(e) =>
                      handleInputChange("clienteBairro", e.target.value)
                    }
                    className="border-gray-300 text-sm"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-700 block mb-2">
                    CEP:
                  </label>
                  <Input
                    type="text"
                    value={formData.clienteCEP}
                    onChange={(e) =>
                      handleInputChange("clienteCEP", e.target.value)
                    }
                    className="border-gray-300 text-sm"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Fotos e Observações Section */}
          <div className="border-b-2 border-gray-900">
            <div className="bg-green-100 border-b border-gray-900 p-3">
              <h3 className="font-bold text-gray-900 text-sm">
                FOTOS E OBSERVAÇÕES
              </h3>
            </div>

            <div className="p-4 grid grid-cols-3 gap-6">
              <div className="col-span-2">
                <h4 className="text-xs font-semibold text-gray-700 mb-3">
                  FOTOS DO LOCAL (4 imagens)
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  {[1, 2, 3, 4].map((num) => (
                    <div key={num} className="relative">
                      <input
                        ref={(el) => {
                          if (el) fileInputRefs.current[`foto${num}`] = el;
                        }}
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageUpload(`foto${num}`, e)}
                        className="hidden"
                      />
                      <div
                        onClick={() =>
                          fileInputRefs.current[`foto${num}`]?.click()
                        }
                        className="border-2 border-dashed border-gray-400 rounded-lg aspect-square flex flex-col items-center justify-center cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition bg-gray-50"
                      >
                        {formData.fotos[`foto${num}` as keyof typeof formData.fotos] ? (
                          <div className="relative w-full h-full">
                            <img
                              src={formData.fotos[`foto${num}` as keyof typeof formData.fotos] as string}
                              alt={`Foto ${num}`}
                              className="w-full h-full object-cover rounded-lg"
                            />
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                removeImage(`foto${num}`);
                              }}
                              className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                            >
                              <X size={16} />
                            </button>
                          </div>
                        ) : (
                          <div className="text-center">
                            <Camera size={32} className="text-gray-400 mx-auto mb-2" />
                            <p className="text-xs text-gray-600">Foto {num}</p>
                            <p className="text-xs text-gray-500">Clique para adicionar</p>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="col-span-1">
                <label className="text-xs font-semibold text-gray-700 block mb-2">
                  OBSERVAÇÕES
                </label>
                <textarea
                  value={formData.observacoes}
                  onChange={(e) =>
                    handleInputChange("observacoes", e.target.value)
                  }
                  className="w-full h-64 p-3 border border-gray-300 rounded-lg text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Adicione observações sobre o levantamento técnico..."
                />
              </div>
            </div>
          </div>

          {/* Formulário de Visita do Projetista */}
          <div className="border-b-2 border-gray-900">
            <div className="bg-black text-white border-b border-gray-900 p-3">
              <h3 className="font-bold text-sm">
                Formulário de visita do projetista
              </h3>
            </div>

            <div className="p-4">
              <div className="space-y-3">
                {[
                  { label: "Central está pronta de acordo com norma vigente?", field: "centralProntaAcordo" },
                  { label: "Alvenaria da central (pórtico, piso, reboco, telhadol)?", field: "alvenariaDetalhes" },
                  { label: "Tanque pode ser enviado com PN?", field: "tanqueEnviado" },
                  { label: "Rede existente?", field: "redesExistentes" },
                  { label: "Rede de consumo precisa alterar quantidade?", field: "redesAlterarQuantidade" },
                  { label: "Caminho Supergasbras abastece com facilidade?", field: "caminhoSuperGasbras" },
                  { label: "Central já possui extintor válido e pressurizado?", field: "centralPossuidor" },
                ].map((item) => (
                  <div key={item.field} className="grid grid-cols-2 gap-4 border-b border-gray-300 pb-3">
                    <label className="text-xs font-semibold text-gray-700">
                      {item.label}
                    </label>
                    <div className="flex gap-6">
                      <label className="flex items-center gap-2 text-xs">
                        <input
                          type="radio"
                          name={item.field}
                          value="sim"
                          checked={formData[item.field as keyof FormData] === "sim"}
                          onChange={() => handleInputChange(item.field as keyof FormData, "sim")}
                          className="w-4 h-4"
                        />
                        Sim:
                      </label>
                      <label className="flex items-center gap-2 text-xs">
                        <input
                          type="radio"
                          name={item.field}
                          value="nao"
                          checked={formData[item.field as keyof FormData] === "nao"}
                          onChange={() => handleInputChange(item.field as keyof FormData, "nao")}
                          className="w-4 h-4"
                        />
                        Não:
                      </label>
                    </div>
                  </div>
                ))}

                {/* Sinal de Celular */}
                <div className="grid grid-cols-2 gap-4 border-b border-gray-300 pb-3">
                  <label className="text-xs font-semibold text-gray-700">
                    Sinal de celular?
                  </label>
                  <div className="flex gap-4">
                    <div className="flex-1">
                      <label className="text-xs font-semibold text-gray-700 block mb-1">
                        Operadora:
                      </label>
                      <Input
                        type="text"
                        value={formData.operadora}
                        onChange={(e) =>
                          handleInputChange("operadora", e.target.value)
                        }
                        className="border-gray-300 text-xs"
                      />
                    </div>
                    <div className="flex items-end gap-2">
                      <label className="flex items-center gap-2 text-xs">
                        <input
                          type="radio"
                          name="sinalCelular"
                          value="sim"
                          checked={formData.sinalCelular === "sim"}
                          onChange={() => handleInputChange("sinalCelular", "sim")}
                          className="w-4 h-4"
                        />
                        Sim:
                      </label>
                      <label className="flex items-center gap-2 text-xs">
                        <input
                          type="radio"
                          name="sinalCelular"
                          value="nao"
                          checked={formData.sinalCelular === "nao"}
                          onChange={() => handleInputChange("sinalCelular", "nao")}
                          className="w-4 h-4"
                        />
                        Não:
                      </label>
                    </div>
                  </div>
                </div>

                {/* WiFi */}
                <div className="grid grid-cols-2 gap-4 pb-3">
                  <label className="text-xs font-semibold text-gray-700">
                    WiFi:
                  </label>
                  <div className="flex gap-6">
                    <label className="flex items-center gap-2 text-xs">
                      <input
                        type="radio"
                        name="wifi"
                        value="sim"
                        checked={formData.wifi === "sim"}
                        onChange={() => handleInputChange("wifi", "sim")}
                        className="w-4 h-4"
                      />
                      Sim:
                    </label>
                    <label className="flex items-center gap-2 text-xs">
                      <input
                        type="radio"
                        name="wifi"
                        value="nao"
                        checked={formData.wifi === "nao"}
                        onChange={() => handleInputChange("wifi", "nao")}
                        className="w-4 h-4"
                      />
                      Não:
                    </label>
                  </div>
                </div>

                {/* Observações Visita */}
                <div className="pt-3">
                  <label className="text-xs font-semibold text-gray-700 block mb-2">
                    Observações:
                  </label>
                  <textarea
                    value={formData.observacoesVisita}
                    onChange={(e) =>
                      handleInputChange("observacoesVisita", e.target.value)
                    }
                    className="w-full h-20 p-2 border border-gray-300 rounded text-xs resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Adicione observações da visita..."
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Avaliação de Quantitativo/Escopo */}
          <div className="border-b-2 border-gray-900">
            <div className="bg-black text-white border-b border-gray-900 p-3">
              <h3 className="font-bold text-sm">
                Avaliação de quantitativo/escopo
              </h3>
            </div>

            <div className="p-4 overflow-x-auto">
              <table className="w-full border-collapse text-xs">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-300 p-2 text-left font-semibold">Descrição</th>
                    <th className="border border-gray-300 p-2 text-center font-semibold">CPQ</th>
                    <th className="border border-gray-300 p-2 text-center font-semibold">Visita</th>
                    <th className="border border-gray-300 p-2 text-center font-semibold">Projeto</th>
                    <th className="border border-gray-300 p-2 text-center font-semibold">Execução</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { label: "Quantidade e capacidade dos tanques:", field: "quantidadeTanques" },
                    { label: "Bitola e metragem de rede:", field: "bitolaMediagemRede" },
                    { label: "Quantidade de pontos:", field: "quantidadePontos" },
                    { label: "Quantidade e tipo de abrigo:", field: "quantidadeTipoAbrigo" },
                    { label: "Laje m²:", field: "ladeAbrigo" },
                    { label: "Pressão:", field: "pressao" },
                  ].map((item) => (
                    <tr key={item.field}>
                      <td className="border border-gray-300 p-2">{item.label}</td>
                      <td className="border border-gray-300 p-2">
                        <Input
                          type="text"
                          value={formData[item.field as keyof FormData] as string}
                          onChange={(e) =>
                            handleInputChange(item.field as keyof FormData, e.target.value)
                          }
                          className="border-gray-300 text-xs w-full"
                        />
                      </td>
                      <td className="border border-gray-300 p-2"></td>
                      <td className="border border-gray-300 p-2"></td>
                      <td className="border border-gray-300 p-2"></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* OBS */}
          <div className="border-b-2 border-gray-900">
            <div className="bg-black text-white border-b border-gray-900 p-3">
              <h3 className="font-bold text-sm">OBS</h3>
            </div>

            <div className="p-4">
              <div className="mb-4">
                <p className="text-xs text-gray-700 mb-2">
                  • Em uma escala de 0 a 10, o nível de DIFICULDADE para equipe LOGÍSTICA é: <span className="font-semibold">____ / 10</span>
                </p>
                <p className="text-xs text-gray-700">
                  • Em uma escala de 0 a 10, o nível de DIFICULDADE para equipe de MONTAGEM é: <span className="font-semibold">____ / 10</span>
                </p>
              </div>
            </div>
          </div>

          {/* Ações */}
          <div className="border-b-2 border-gray-900">
            <div className="grid grid-cols-2 gap-0">
              {/* Ações Cliente */}
              <div className="border-r border-gray-900">
                <div className="bg-black text-white border-b border-gray-900 p-3">
                  <h3 className="font-bold text-sm">AÇÕES CLIENTE:</h3>
                </div>
                <div className="p-4">
                  <textarea
                    value={formData.acoesCliente}
                    onChange={(e) =>
                      handleInputChange("acoesCliente", e.target.value)
                    }
                    className="w-full h-24 p-2 border border-gray-300 rounded text-xs resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Descreva as ações necessárias do cliente..."
                  />
                </div>
              </div>

              {/* Ações Supergasbras */}
              <div>
                <div className="bg-black text-white border-b border-gray-900 p-3">
                  <h3 className="font-bold text-sm">AÇÕES SUPERGASBRAS</h3>
                </div>
                <div className="p-4">
                  <textarea
                    value={formData.acoesSuperGasbras}
                    onChange={(e) =>
                      handleInputChange("acoesSuperGasbras", e.target.value)
                    }
                    className="w-full h-24 p-2 border border-gray-300 rounded text-xs resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Descreva as ações necessárias da Supergasbras..."
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Assinatura */}
          <div className="border-b-2 border-gray-900">
            <div className="bg-black text-white border-b border-gray-900 p-3">
              <h3 className="font-bold text-sm">Assinatura do projetista:</h3>
            </div>

            <div className="p-4">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="text-xs font-semibold text-gray-700 block mb-2">
                    CPQ conforme o levantamento de projeto?
                  </label>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2 text-xs">
                      <input
                        type="radio"
                        name="cpqConforme"
                        value="sim"
                        className="w-4 h-4"
                      />
                      Sim:
                    </label>
                    <label className="flex items-center gap-2 text-xs">
                      <input
                        type="radio"
                        name="cpqConforme"
                        value="nao"
                        className="w-4 h-4"
                      />
                      Não:
                    </label>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-gray-700 block mb-2">
                    Assinatura de cliente / Doc. de identificação:
                  </label>
                  <Input
                    type="text"
                    placeholder="Assinatura ou documento"
                    className="border-gray-300 text-xs"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Info */}
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-gray-700">
            <strong>Como usar:</strong> Preencha todos os campos acima. Clique nos espaços de fotos para adicionar imagens. Para exportar como PDF, clique em "Imprimir/PDF" e escolha "Salvar como PDF" no navegador. Para baixar como HTML, clique em "Download".
          </p>
        </div>
      </div>
    </div>
  );
}
