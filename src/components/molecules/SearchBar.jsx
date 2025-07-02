import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Input from "@/components/atoms/Input";
import AppIcon from "@/components/atoms/AppIcon";
const SearchBar = ({ onSearch, placeholder = "Search tasks...", className = '' }) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [isFocused, setIsFocused] = useState(false)
  
  useEffect(() => {
    const delayedSearch = setTimeout(() => {
      onSearch(searchTerm)
    }, 300)
    
    return () => clearTimeout(delayedSearch)
  }, [searchTerm, onSearch])
  
  return (
    <motion.div
      className={`relative ${className}`}
      animate={{ scale: isFocused ? 1.02 : 1 }}
      transition={{ duration: 0.2 }}
    >
      <Input
        type="text"
        placeholder={placeholder}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        icon="Search"
        className="bg-white shadow-sm border-gray-200 focus:shadow-md"
      />
      {searchTerm && (
        <motion.button
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          onClick={() => setSearchTerm('')}
        >
          <AppIcon name="X" className="w-4 h-4" />
        </motion.button>
      )}
    </motion.div>
  )
}

export default SearchBar